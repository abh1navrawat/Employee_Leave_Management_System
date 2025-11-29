const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.applyLeave = async (req,res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000*60*60*24)) + 1;
    if (diff <= 0) return res.status(400).json({ msg: 'Invalid dates' });

    // check balance
    const user = await User.findById(req.user._id);
    const balance = user.leaveBalance;
    const key = leaveType === 'sick' ? 'sickLeave' : (leaveType === 'casual' ? 'casualLeave' : 'vacation');
    if (balance[key] < diff) return res.status(400).json({ msg: 'Not enough leave balance' });

    const leave = new LeaveRequest({
      userId: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      totalDays: diff,
      reason
    });
    await leave.save();
    res.json(leave);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.myRequests = async (req,res) => {
  const leaves = await LeaveRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(leaves);
};

exports.cancelRequest = async (req,res) => {
  const { id } = req.params;
  const leave = await LeaveRequest.findById(id);
  if (!leave) return res.status(404).json({ msg: 'Not found' });
  if (!leave.userId.equals(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
  if (leave.status !== 'pending') return res.status(400).json({ msg: 'Can only cancel pending' });
  await leave.remove();
  res.json({ msg: 'Cancelled' });
};

// Manager endpoints
exports.allRequests = async (req,res) => {
  // only manager
  if (req.user.role !== 'manager') return res.status(403).json({ msg: 'Forbidden' });
  const leaves = await LeaveRequest.find().populate('userId','name email').sort({ createdAt: -1 });
  res.json(leaves);
};

exports.pendingRequests = async (req,res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ msg: 'Forbidden' });
  const leaves = await LeaveRequest.find({ status: 'pending' }).populate('userId','name email').sort({ createdAt: -1 });
  res.json(leaves);
};

exports.approve = async (req,res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ msg: 'Forbidden' });
  const { id } = req.params;
  const leave = await LeaveRequest.findById(id);
  if (!leave) return res.status(404).json({ msg: 'Not found' });
  if (leave.status !== 'pending') return res.status(400).json({ msg: 'Already processed' });

  // deduct balance
  const user = await User.findById(leave.userId);
  const key = leave.leaveType === 'sick' ? 'sickLeave' : (leave.leaveType === 'casual' ? 'casualLeave' : 'vacation');
  user.leaveBalance[key] = Math.max(0, user.leaveBalance[key] - leave.totalDays);
  await user.save();

  leave.status = 'approved';
  leave.managerComment = req.body.managerComment || '';
  await leave.save();
  res.json(leave);
};

exports.reject = async (req,res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ msg: 'Forbidden' });
  const { id } = req.params;
  const leave = await LeaveRequest.findById(id);
  if (!leave) return res.status(404).json({ msg: 'Not found' });
  if (leave.status !== 'pending') return res.status(400).json({ msg: 'Already processed' });
  leave.status = 'rejected';
  leave.managerComment = req.body.managerComment || '';
  await leave.save();
  res.json(leave);
};
