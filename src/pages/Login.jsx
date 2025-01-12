import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../state/user/userSlice';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    // const res = await fetch(
    //   `https://dummyjson.com/test/users/filter?key=username&value=${username}`
    // );

    const res = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
      }),
    });

    if (res.status === 400) {
      console.log('Username or password is not correct');
      return;
    }

    const user = await res.json();
    console.log('Successfully login');
    dispatch(login({ ...user, isAuthenticated: true }));
    navigate('/dashboard');
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <TextField
          id='username-input'
          label='User'
          variant='outlined'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id='password-input'
          type='password'
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='contained' type='submit'>
          Submit
        </Button>
        ;
      </form>
    </>
  );
}

export default Login;
