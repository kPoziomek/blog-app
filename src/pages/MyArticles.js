import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMyArticles } from '../helpers/axiosConfig';
import './MyArticles.css';
import { useNavigate } from 'react-router-dom';
import { deleteMyArticle, postMyArticle } from '../helpers/axiosConfig';

const MyArticles = () => {
  const [myArticles, setMyArticles] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getMyArticles().then((response) => {
      let myArrOfArticles = response.data;
      setMyArticles(myArrOfArticles);
    });
  }, []);

  const editPost = (value) => {
    navigate('/editedarticle', { state: value });
  };
  const postPost = (id) => {
    postMyArticle(id).then((res) => {
      if (res.status === 200) {
        const updatedArticle = res.data;
        setMyArticles((prev) => {
          return prev.map((element) => {
            return element.id === updatedArticle.id ? updatedArticle : element;
          });
        });
      }
    });
  };
  const deletePost = (id) => {
    deleteMyArticle(id).then((response) => {
      if (response.status === 200) {
        const filteredArticle = myArticles.filter((article) => {
          return article.id !== id;
        });
        setMyArticles(filteredArticle);
      }
    });
  };

  return (
    <div>
      <Box className="my-article">
        {myArticles &&
          myArticles.map((arr) => {
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

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {arr.summary}
                  </Typography>
                  <hr />
                  <Typography variant="body2">
                    publishedAt:
                    {arr.publishedAt
                      ? ` ${arr.publishedAt.slice(0, 10)}`
                      : 'not published'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => editPost(arr)}
                  >
                    edit
                  </Button>
                  {!arr.publishedAt && (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => postPost(arr.id)}
                    >
                      post
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => deletePost(arr.id)}
                  >
                    delete
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </div>
  );
};

export default MyArticles;
