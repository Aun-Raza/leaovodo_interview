import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';

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

  const { id, username, firstName, lastName, email, gender, image } = user;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f9f9f9',
      }}
    >
      {/* User Card */}
      <Card sx={{ width: 300, boxShadow: 3, padding: 2 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* User Avatar */}
          <Avatar
            alt='User Avatar'
            sx={{ width: 80, height: 80, marginBottom: 2 }}
            src={image}
          />
          {/* User Name */}
          <Typography variant='h6' gutterBottom>
            {email}
          </Typography>
          {/* Email */}
          <Typography variant='body2' color='text.secondary' gutterBottom>
            user@example.com
          </Typography>
          {/* Placeholder for Additional Info */}
          <Typography
            variant='body1'
            sx={{ marginTop: 1, textAlign: 'center' }}
          >
            Additional user details can go here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;
