import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();

    const res = await fetch(
      `https://dummyjson.com/test/users/filter?key=username&value=${username}`
    );
    const { status } = await res.json();
    if (status === 'ok') {
      console.log('Successfully login');
      navigate('/dashboard');
    }
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
