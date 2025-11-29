import React, { useEffect, useState } from 'react';
import API from '../api';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const user = useSelector(s=>s.auth.user);
  const [stats,setStats]=useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{ if (!user) return; (async()=> {
    try {
      const res = await API.get('/dashboard/' + (user.role==='manager' ? 'manager' : 'employee'));
      setStats(res.data);
    } catch(e){ console.error(e); }
  })(); },[user]);

  return (
    <div>
      <h3>Dashboard ({user?.name})</h3>
      <div>
        <button onClick={()=>dispatch(logout())}>Logout</button>
      </div>
      {user?.role==='employee' && (
        <div>
          <Link to='/apply'>Apply Leave</Link> | <Link to='/my-requests'>My Requests</Link>
        </div>
      )}
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
