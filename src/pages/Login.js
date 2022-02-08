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
import MuiAlert from '@material-ui/lab/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />ś
    </SvgIcon>
  );
};

const Login = (props) => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [error, setError] = useState('');

  const logUser = (user) => {
    axios({
      method: 'post',
      url: '/auth/login',
      data: user,
    })
      .then((res) => {
        const { data } = res;
        localStorage.removeItem('token');
        localStorage.setItem('token', data.auth_token);
        navigate('/');
        // redirect(isLogin);
      })
      .catch((res) => console.log(res));
  };

  // const redirect = (value) => {
  //   if (value) {
  //     navigate('/', { state: { isLogin: value } });
  //   }
  // };

  const onEmailChange = (e) => {
    let emailValue = setEmailValue(e.target.value);
    return emailValue;
  };

  const onPasswordChange = (e) => {
    let passValue = setPasswordValue(e.target.value);
    return passValue;
  };
  const handleSubmit = () => {
    if (emailValue === '' || passwordValue === '') {
      setError('Uzupełnij pola wymagane');
      return;
    }
    const userLogin = {
      email: emailValue,
      password: passwordValue,
    };
    setEmailValue('');
    setPasswordValue('');
    logUser(userLogin);
    return userLogin;
  };
  return (
    <form>
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
      {error && (
        <Stack sx={{ width: '20%', mx: 'auto' }}>
          <Alert severity="error" onClick={() => setError(null)}>
            {error}
          </Alert>
        </Stack>
      )}
    </form>
  );
};

export default Login;
