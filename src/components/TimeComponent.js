import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import React, { useCallback, useContext } from 'react';
import { ThemesProvider } from '../contexts/ThemesProvider';
import { ThemeProvider } from '@mui/material/styles';
import Timer from './Timer';

export const TimeComponent = ({ isModalOpen, handleTimeComponent }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const today = new Date();

  return (
    <>
      <ThemeProvider theme={ThemesProvider}>
        <Button
          color="neutral"
          variant="outlined"
          onClick={handleTimeComponent}
        >
          Open modal
        </Button>
      </ThemeProvider>
      <Modal
        title="modal title"
        open={isModalOpen}
        onClose={() => handleTimeComponent()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Current Time is:
          </Typography>
          <Typography
            id="modal-modal-description"
            component="h2"
            variant="h3"
            sx={{ mx: 2, my: 2 }}
          >
            {today.getHours()}:{today.getMinutes()}:{today.getSeconds()}
          </Typography>
          <Divider />
          <Timer />
        </Box>
      </Modal>
    </>
  );
};
