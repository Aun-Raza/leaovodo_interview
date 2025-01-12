import React, { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    getUserProfile('john');
  }, []);

  async function getUserProfile(username) {
    const res = await fetch(`https://dummyjson.com/test/users/${username}`);
    console.log(res);
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
