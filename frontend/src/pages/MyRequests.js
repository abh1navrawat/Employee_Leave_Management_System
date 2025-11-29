import React, { useEffect, useState } from 'react';
import API from '../api';

export default function MyRequests(){
  const [list,setList]=useState([]);
  useEffect(()=>{ (async()=> {
    try {
      const res = await API.get('/leaves/my-requests');
      setList(res.data);
    } catch(e){ console.error(e); }
  })(); },[]);
  return (
    <div>
      <h3>My Requests</h3>
      <ul>
        {list.map(l=>(
          <li key={l._id}>{l.leaveType} {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()} [{l.status}]</li>
        ))}
      </ul>
    </div>
  );
}
