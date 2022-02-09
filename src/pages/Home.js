import React from 'react';
import './Home.css';
import ReactLogo from '../Images/logo512.png';

import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Nav from './components/Nav';

const Home = () => {
  return (
    <>
      <Box>
        <Card>
          <Nav />

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
