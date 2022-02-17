import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import ReactLogo from '../Images/logo512.png';
import { authMe } from '../helpers/axiosConfig';

import './Navigation.css';

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
            <Box className="nav-box">
              {isToken && (
                <>
                  <Link className="link-btn" to="/">
                    <Button
                      className="nav-login-btn"
                      variant="contained"
                      color="primary"
                      sx={{ mx: 2, p: 1.3 }}
                    >
                      home
                    </Button>
                  </Link>
                  <Link className="link-btn" to="/my">
                    <Button
                      className="nav-login-btn"
                      variant="contained"
                      color="primary"
                      sx={{ mx: 2, p: 1.3 }}
                    >
                      My Article
                    </Button>
                  </Link>
                  <Link
                    className="link-btn"
                    to="/carticle"
                    onClick={() => null}
                  >
                    <Button
                      className="nav-login-btn"
                      variant="contained"
                      color="primary"
                      sx={{ mx: 2, p: 1.3 }}
                    >
                      Create Article
                    </Button>
                  </Link>
                </>
              )}
              <Button
                className="nav-login-btn"
                variant="contained"
                color="primary"
                sx={{ mx: 2 }}
                onClick={handleLogin}
              >
                {isToken ? 'logout' : 'login'}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
