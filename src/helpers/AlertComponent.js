import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const AlertComponent = ({ error }) => {
  return (
    <Stack sx={{ width: '100%', textAlign: 'center' }} spacing={2}>
      <Alert sx={{ justifyContent: 'center' }} severity="error">
        Sorry we have {error.message}
      </Alert>
    </Stack>
  );
};

export default AlertComponent;
