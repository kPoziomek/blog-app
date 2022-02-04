/* eslint-disable no-undef */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Paper,
  SvgIcon,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
// TODO: delete ?
<Box
  component="span"
  sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
>
  •
</Box>;

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />ś
    </SvgIcon>
  );
};

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onEmailChange = (e) => {
    let emailValue = setEmailValue(e.target.value);
    return emailValue;
  };

  const onPasswordChange = (e) => {
    let passValue = setPasswordValue(e.target.value);
    return passValue;
  };
  const handleSubmit = () => {
    const userLogin = {
      email: emailValue,
      password: passwordValue,
    };
    setEmailValue('');
    setPasswordValue('');
    console.log(userLogin);
    return userLogin;
  };
  return (
    <Box
      className="login-page"
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      <Card sx={{ minWidth: 545 }}>
        <CardHeader
          className="login-card"
          avatar={
            <Avatar sx={{ bgcolor: '#2196f3' }} aria-label="recipe">
              <Link to="/">
                <HomeIcon sx={{ color: '#fff' }} />
              </Link>
            </Avatar>
          }
          title="Login Form"
        />
        <Paper className="login-actions">
          <p>You can login ? I believe in you.</p>

          <TextField
            label={'Email'}
            onChange={onEmailChange}
            value={emailValue}
          />
          <TextField
            label={'Password'}
            type="password"
            onChange={onPasswordChange}
            value={passwordValue}
          />

          <Button onClick={handleSubmit}>Submit</Button>
        </Paper>
      </Card>
    </Box>
  );
};

export default Login;
