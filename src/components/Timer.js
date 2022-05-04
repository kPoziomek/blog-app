import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };
  const timerReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <Box className="container">
      <Typography variant="h6" component="h2" sx={{ mx: 2, my: 2 }}>
        Timer exercise
      </Typography>
      <Typography
        id="modal-modal-description"
        component="h2"
        variant="h3"
        sx={{ mx: 2, my: 2 }}
      >
        {seconds ? seconds : '0'}
      </Typography>
      <div className="mt-2 ">
        <Button
          color="secondary"
          variant="outlined"
          className={`btn mx-2  btn-${isActive ? 'secondary' : 'primary'}`}
          onClick={toggle}
        >
          {isActive ? 'Pause' : 'start'}
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ mx: 2 }}
          onClick={timerReset}
        >
          reset
        </Button>
      </div>
    </Box>
  );
};

export default Timer;
