import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ApplyLeave(){
  const [leaveType,setLeaveType]=useState('sick');
  const [startDate,setStartDate]=useState('');
  const [endDate,setEndDate]=useState('');
  const [reason,setReason]=useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/leaves', { leaveType, startDate, endDate, reason });
      alert('Applied');
      navigate('/my-requests');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>Apply Leave</h3>
      <select value={leaveType} onChange={e=>setLeaveType(e.target.value)}>
        <option value='sick'>Sick</option>
        <option value='casual'>Casual</option>
        <option value='vacation'>Vacation</option>
      </select><br/>
      <input type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} /><br/>
      <input type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} /><br/>
      <textarea placeholder='Reason' value={reason} onChange={e=>setReason(e.target.value)} /><br/>
      <button type='submit'>Apply</button>
    </form>
  );
}
