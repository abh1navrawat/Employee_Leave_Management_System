const LeaveRequest = require('../models/LeaveRequest');

exports.employeeStats = async (req,res) => {
  const total = await LeaveRequest.countDocuments({ userId: req.user._id });
  const pending = await LeaveRequest.countDocuments({ userId: req.user._id, status: 'pending' });
  const approved = await LeaveRequest.countDocuments({ userId: req.user._id, status: 'approved' });
  res.json({ total, pending, approved });
};

exports.managerStats = async (req,res) => {
  if (req.user.role !== 'manager') return res.status(403).json({ msg: 'Forbidden' });
  const total = await LeaveRequest.countDocuments();
  const pending = await LeaveRequest.countDocuments({ status: 'pending' });
  const approved = await LeaveRequest.countDocuments({ status: 'approved' });
  res.json({ total, pending, approved });
};
