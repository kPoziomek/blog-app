import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMyArticles } from '../../helpers/axiosConfig';
import './MyArticles.css';
const MyArticles = () => {
  const [myArticle, setMyArticle] = useState();
  useEffect(() => {
    getMyArticles().then((response) => {
      let myArrOfArticles = response.data;

      setMyArticle(myArrOfArticles);
      console.log(myArticle);
    });
  }, [myArticle]);

  return (
    <Box className="my-article">
      {myArticle &&
        myArticle.map((arr, index) => {
          console.log(arr);
          return (
            <Card sx={{ maxWidth: 400, my: 1 }} key={arr.id}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {arr.title}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  dangerouslySetInnerHTML={{ __html: arr.content }}
                ></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {arr.summary}
                </Typography>
                <hr />
                <Typography variant="body2">
                  publishedAt:
                  {arr.publishedAt ? ` ${arr.publishedAt}` : 'not published'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  edit
                </Button>
                <Button size="small" variant="contained" color="primary">
                  add
                </Button>
                <Button size="small" variant="contained" color="primary">
                  delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </Box>
  );
};

export default MyArticles;
