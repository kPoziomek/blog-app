import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';
import ReactLogo from '../Images/logo512.png';
import './Navigation.css';
import NavigationMenu from './NavigationMenu';
import { useUserContext } from '../UserContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { userData, tokenData, logoutUser } = useUserContext();

  const handleAuthentication = () => {
    if (tokenData) {
      logoutUser();
      navigate('/');
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
                <h3 className="nav-text" onClick={handleAuthentication}>
                  Blog-App
                </h3>
              </div>
            </Link>
            <div className="user">
              <h3 className="nav-user-text">
                {userData
                  ? `Hello ${userData.firstName} ${userData.lastName}`
                  : 'Hello Stranger'}
              </h3>
            </div>
            <NavigationMenu onAuthentication={handleAuthentication} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
