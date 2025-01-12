import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const username = useSelector((state) => state.user.username);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  async function authenticate() {
    if (isAuthenticated) return;
    else navigate('/');
  }

  useEffect(() => {
    authenticate();
  }, []);

  async function getUserProfile(username) {
    const res = await fetch(`https://dummyjson.com/test/users/${username}`);
    console.log(res);
  }
  return <div>Dashboard: {username ? username : 'nothing'}</div>;
}

export default Dashboard;
