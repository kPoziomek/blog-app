import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Paper,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import HomeIcon from '@mui/icons-material/Home';
import './Login.css';
import { useUserContext } from '../UserContext';
const Login = () => {
  const { loginUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    loginUser(values, { onSuccess: () => navigate('/')});


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
    <form onSubmit={formik.handleSubmit} className="login-page">
      <Box
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
