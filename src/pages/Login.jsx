import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../state/user/userSlice';
import Button from '@mui/material/Button';
import { Box, TextField, Typography } from '@mui/material';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f9f9f9',
        padding: 2,
      }}
    >
      <Typography variant='h4' gutterBottom>
        Login
      </Typography>
      <Box
        component='form'
        onSubmit={submit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          id='username-input'
          label='User'
          variant='outlined'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          id='password-input'
          type='password'
          label='Password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant='contained' type='submit' fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
