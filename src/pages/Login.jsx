import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../state/user/userSlice';

function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function authenticate() {
    if (!isAuthenticated) return;
    else navigate('/dashboard');
  }

  useEffect(() => {
    authenticate();
  }, []);

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
    dispatch(login({ username: username, isAuthenticated: true }));
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
