import React, { useEffect, useState } from 'react';
import './Home.css';
import ReactLogo from '../Images/logo512.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

const Home = () => {
  const [isToken, setIsToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsToken(true);
    }
  }, []);
  const navigate = useNavigate();
  const getToken = () => {
    if (localStorage.getItem('token')) {
      setIsToken(true);
    } else {
      setIsToken(false);
      navigate('/login');
    }
    if (isToken) {
      setIsToken(false);
      localStorage.removeItem('token');
    }
  };

  return (
    <>
      <Box>
        <Card>
          <CardHeader
            className="nav-container"
            title={
              <div className="nav-logo">
                <img className="nav-img" src={ReactLogo} alt="logos" />
                <h3 className="nav-text">Blog-App</h3>
              </div>
            }
            avatar={
              <Button
                className="nav-login-btn"
                variant="contained"
                color="primary"
                onClick={getToken}
              >
                {isToken ? 'logout' : 'login'}
              </Button>
            }
          />
          <nav className="nav-container"></nav>

          <main className="main-container">
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                React Blog
              </Typography>
              <CardMedia
                component="img"
                height="100"
                image={ReactLogo}
                alt="react blog"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CARD ABOUT REACT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Func fact about react
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                React Blog
              </Typography>
              <CardMedia
                component="img"
                height="100"
                image={ReactLogo}
                alt="react blog"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CARD ABOUT REACT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Func fact about react
                </Typography>
              </CardContent>
            </Card>
          </main>
          <footer className="footer-container"></footer>
        </Card>
      </Box>
    </>
  );
};

export default Home;
