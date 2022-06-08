import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';

import ReactLogo from '../Images/logo512.png';

import './Navigation.css';
import NavigationMenu from './NavigationMenu';
import { AuthorizationContext } from '../context/AuthorizationContext';

const Navigation = () => {
  const { removeAuthToken, userName, dispatch } =
    useContext(AuthorizationContext);

  const navigate = useNavigate();
  const handleLogin = () => {
    if (userName) {
      navigate('/');
      dispatch({ type: 'removeUserName' });
      removeAuthToken();
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
            <NavigationMenu handleLogin={handleLogin} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
