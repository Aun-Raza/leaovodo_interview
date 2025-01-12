import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../state/user/userSlice';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function submit(e) {
    e.preventDefault();

    const res = await fetch(
      `https://dummyjson.com/test/users/filter?key=username&value=${username}`
    );
    const { status } = await res.json();
    if (status !== 'ok') {
      return;
    }

    console.log('Successfully login');
    dispatch(login({ username: username }));
    navigate('/dashboard');
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default Login;
