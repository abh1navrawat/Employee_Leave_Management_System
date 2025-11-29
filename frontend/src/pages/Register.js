import React, { useState } from 'react';
import API from '../api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('employee');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password, role });
      dispatch(setAuth(res.data));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>Register</h3>
      <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value='employee'>Employee</option>
        <option value='manager'>Manager</option>
      </select><br/>
      <button type='submit'>Register</button>
    </form>
  );
}
