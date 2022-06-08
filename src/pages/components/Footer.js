import { Box } from '@mui/material';
import React from 'react';
import { useArticles } from '../../hooks/useArticles';

const Footer = () => {
  const { data } = useArticles();
  return (
    <Box
      sx={{
        margin: '10px',
        padding: '10px',
        backgroundColor: '#1976D2',
        color: '#fff',
      }}
    >
      You have {data?.length} articles on page{' '}
    </Box>
  );
};

export default Footer;
