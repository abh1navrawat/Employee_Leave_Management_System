import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyRequests from './pages/MyRequests';

export default function App(){
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h2>Employee Leave Management</h2>
      <nav>
        <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link> | <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/apply' element={<ApplyLeave/>} />
        <Route path='/my-requests' element={<MyRequests/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}
