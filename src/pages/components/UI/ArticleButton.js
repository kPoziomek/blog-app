import React from 'react';
import { IconButton } from '@mui/material';

const ArticleButton = ({ icon, handleClick, to, component }) => {
  return (
    <IconButton
      component={component}
      size="small"
      variant="contained"
      color="primary"
      onClick={handleClick}
      to={to}
    >
      {icon}
    </IconButton>
  );
};

export default ArticleButton;
