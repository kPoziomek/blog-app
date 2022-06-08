import React from 'react';
import ReactLogo from '../../Images/logo512.png';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import './BlogThumbnailContent.css';

const BlogThumbnailContent = ({ singleArticle, actionButtons }) => {
  const { title, summary, authorFullName, image } = singleArticle;

  return (
    <Card className="thumbnail-main" sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h6" component="div">
        Title: {title}
      </Typography>

      {image && (
        <CardMedia component="img" image={ReactLogo} alt="react blog" />
      )}

      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {summary}
        </Typography>

        {authorFullName && (
          <Typography variant="body2" color="text.secondary">
            {authorFullName}
          </Typography>
        )}
      </CardContent>
      <CardActions>{actionButtons}</CardActions>
    </Card>
  );
};

export default BlogThumbnailContent;
