import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Button, Box } from '@mui/material';
import ReactLogo from '../../Images/logo512.png';
import axiosConfig from '../../helpers/axiosConfig';
import './Nav.css';

const Nav = () => {
  const [isToken, setIsToken] = useState(false);
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsToken(true);
      axiosConfig.get('/auth/me').then((res) => {
        const userData = res.data;
        setUserName(`${userData.firstName} ${userData.lastName} `);
      });
    }
  }, []);
  const navigate = useNavigate();
  const handleLogin = () => {
    if (isToken) {
      setIsToken(false);
      localStorage.removeItem('token');
      setUserName();
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <CardHeader
        className="nav-container"
        title={
          <Box className="nav-logo">
            <div className="logo">
              <img className="nav-img" src={ReactLogo} alt="logos" />
              <h3 className="nav-text">Blog-App</h3>
            </div>
            <div className="user">
              <h3 className="nav-user-text">
                {userName ? `Witaj ${userName}` : 'Witaj nieznajomy'}
              </h3>
            </div>
          </Box>
        }
        avatar={
          <Button
            className="nav-login-btn"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            {isToken ? 'logout' : 'login'}
          </Button>
        }
      />
    </>
  );
};

export default Nav;
