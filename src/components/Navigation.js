import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';

import ReactLogo from '../Images/logo512.png';

import './Navigation.css';
import NavigationMenu from './NavigationMenu';
import { useApi } from '../contexts/ApiProvider';
import { TimeComponent } from './TimeComponent';

const Navigation = () => {
  const [isToken, setIsToken] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState();
  const loggedIn = localStorage.key('token');
  const api = useApi();

  useEffect(() => {
    if (loggedIn === 'token') {
      setIsToken(true);

      api
        .authMe()
        .then((res) => {
          const userData = res.data;

          setUserName(`${userData.firstName} ${userData.lastName} `);
        })
        .catch((err) => console.log(err));
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
  const handleTimeComponent = () => {
    if (!isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    } else {
      setIsModalOpen(false);
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
                <h3 className="nav-text" data-testid="nav-logo-text">
                  Blog-App
                </h3>
              </div>
            </Link>
            <div className="nav-user-text">
              <TimeComponent
                isModalOpen={isModalOpen}
                handleTimeComponent={handleTimeComponent}
              />
            </div>
            <div className="user">
              <h3 className="nav-user-text" data-testid="greeting-text">
                {`Hello ${userName ?? 'Stranger'}`}
              </h3>
            </div>
            <NavigationMenu
              aria-label="test navigation"
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
