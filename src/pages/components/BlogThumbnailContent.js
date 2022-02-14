import React from 'react';
import ReactLogo from '../../Images/logo512.png';
import { Card, Typography, CardMedia, CardContent } from '@mui/material';

const BlogThumbnailContent = ({ arr }) => {
  const { title, summary, author } = arr;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <CardMedia component="img" image={ReactLogo} alt="react blog" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {summary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${author.firstName} ${author.lastName}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogThumbnailContent;
