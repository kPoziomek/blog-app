import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Button, Box } from '@mui/material';
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
            <Link to="/" className="nav-link-box">
              <div className="logo">
                <img className="nav-img" src={ReactLogo} alt="logos" />
                <h3 className="nav-text">Blog-App</h3>
              </div>
            </Link>
            <div className="user">
              <h3 className="nav-user-text">
                {userName ? `Hello ${userName}` : 'Hello Stranger'}
              </h3>
            </div>
          </Box>
        }
        avatar={
          isToken ? (
            <div>
              <Link className="link-btn" to="/createArticle">
                <Button
                  className="nav-login-btn"
                  variant="contained"
                  color="primary"
                  sx={{ mx: 2 }}
                >
                  Create Article
                </Button>
              </Link>
              <Button
                className="nav-login-btn"
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                logout
              </Button>
            </div>
          ) : (
            <Button
              className="nav-login-btn"
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          )
        }
      />
    </>
  );
};

export default Navigation;
