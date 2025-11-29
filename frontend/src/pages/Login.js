import React, { useState } from 'react';
import API from '../api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      dispatch(setAuth(res.data));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>Login</h3>
      <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button type='submit'>Login</button>
    </form>
  );
}
