import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const username = useSelector((state) => state.user.username);
  useEffect(() => {
    console.log(username);
  }, [username]);

  async function getUserProfile(username) {
    const res = await fetch(`https://dummyjson.com/test/users/${username}`);
    console.log(res);
  }
  return <div>Dashboard: {username ? username : 'nothing'}</div>;
}

export default Dashboard;
