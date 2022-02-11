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
import { loginUserAPI } from '../helpers/axiosConfig';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import './Login.css';

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />ś
    </SvgIcon>
  );
};

const Login = () => {
  const navigate = useNavigate();

  const logUser = (user) => {
    loginUserAPI(user)
      .then((res) => {
        const { data } = res;
        localStorage.setItem('token', data.auth_token);
        navigate('/');
      })
      .catch((res) => console.log(res));
  };

  const handleSubmit = (values) => {
    logUser(values);
  };
  const validationSchema = yup.object({
    email: yup
      .string('Podaj email')
      .email('Podaj poprawny email')
      .required('email wymagany'),
    password: yup
      .string('Podaj hasło')
      .min(6, ' hasło musi zawierać więcej niz 6 znaków')
      .required('hasło wymagane'),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
            title="Login Page"
            s
          />
          <Paper className="login-actions">
            <TextField
              id="email"
              name="email"
              label="e-mail"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            <Button className="btn-submit" type="submit">
              Send
            </Button>
          </Paper>
        </Card>
      </Box>
    </form>
  );
};

export default Login;
