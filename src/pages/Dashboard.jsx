import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from '@mui/material';
import { logout } from '../state/user/userSlice';

function Dashboard() {
  const token = useSelector((state) => state.user.accessToken);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();

  async function authenticate() {
    if (isAuthenticated) {
      await getUserDetail();
    } else navigate('/');
  }

  async function getUserDetail() {
    const res = await fetch('https://dummyjson.com/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
      },
    });

    const userDetail = await res.json();
    setUserDetail(userDetail);
    console.log(userDetail);
  }

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
    authenticate();
  }, []);

  const {
    username,
    firstName,
    lastName,
    email,
    gender,
    image,
    age,
    birthDate,
    phone,
    address,
    company,
    university,
  } = userDetail;

  return (
    userDetail && (
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
        <Card sx={{ width: 400, boxShadow: 3, padding: 2 }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              alt='User Avatar'
              src={image}
              sx={{ width: 100, height: 100 }}
            />

            <Typography variant='h6' gutterBottom>
              {firstName} {lastName}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Username: {username}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Email: {email}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Gender: {gender}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Age: {age}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Birth Date: {birthDate}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Phone: {phone}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Address:{' '}
              <p>
                {address?.address || 'N/A'}, {address?.city || 'N/A'},{' '}
                {address?.state || 'N/A'} ({address?.stateCode || 'N/A'})
              </p>
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Company:{' '}
              <p>
                {company?.name || 'N/A'}, {company?.title || 'N/A'}
              </p>
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              University: {university}
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant='contained'
          color='error'
          sx={{ marginTop: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    )
  );
}

export default Dashboard;
