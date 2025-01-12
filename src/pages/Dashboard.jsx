import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  async function authenticate() {
    if (isAuthenticated) return;
    else navigate('/');
  }

  useEffect(() => {
    authenticate();
    console.log(user.firstName);
  }, []);

  async function getUserProfile(username) {
    const res = await fetch(`https://dummyjson.com/test/users/${username}`);
    console.log(res);
  }
  return (
    <div>
      <div>{user.username}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.email}</div>
      <div>{user.image}</div>
    </div>
  );
}

export default Dashboard;
