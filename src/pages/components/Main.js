import React from 'react';
import ReactLogo from '../../Images/logo512.png';
import { Card, Typography, CardMedia, CardContent } from '@mui/material';

const Main = (props) => {
  const prpData = props.arr;
  const prpAuthor = props.arr.author;
  //   const getArticle = axiosConfig.get('/article').then((res) => res);
  console.log(prpAuthor);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div">
        {prpData.title}
      </Typography>
      <CardMedia component="img" image={ReactLogo} alt="react blog" />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {prpData.content}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {prpData.summary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${prpAuthor.firstName} ${prpAuthor.lastName}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Main;
