import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';

import ReactLogo from '../Images/logo512.png';
import { authMe } from '../helpers/axiosConfig';

import './Navigation.css';
import NavigationMenu from './NavigationMenu';

const Navigation = () => {
  const [isToken, setIsToken] = useState(false);
  const [userName, setUserName] = useState();
  const loggedIn = localStorage.key('token');

  useEffect(() => {
    if (loggedIn) {
      setIsToken(true);
      authMe().then((res) => {
        const userData = res.data;
        setUserName(`${userData.firstName} ${userData.lastName} `);
      });
    }
  }, [loggedIn]);

  const navigate = useNavigate();
  const handleLogin = () => {
    if (isToken) {
      setIsToken(false);
      localStorage.removeItem('token');
      navigate('/');
      setUserName();
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <AppBar position="static" className="nav-container">
        <Toolbar disableGutters className="nav-toolbar">
          <Box className="nav-logo">
            <Link to="/" className="nav-link-box">
              <div className="logo">
                <img className="nav-img" src={ReactLogo} alt="logos" />
                <h3 className="nav-text">Blog-App</h3>
              </div>
            </Link>
            <div className="user">
              <h3 className="nav-user-text">
                {`Hello ${userName ?? 'Stranger'} `}
              </h3>
            </div>
            <NavigationMenu
              userName={userName}
              isToken={isToken}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
