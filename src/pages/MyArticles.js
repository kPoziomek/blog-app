import { Box, IconButton, CircularProgress } from '@mui/material';
import React from 'react';

import BlogThumbnailContent from '../pages/components/BlogThumbnailContent';
import './MyArticles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from 'react-router-dom';

import useMyArticles from '../hooks/useMyArticles';
import { useQueryClient } from 'react-query';

import { useDeleteArticle } from '../hooks/useDeleteArticle';
import { usePostArticle } from '../hooks/usePostArticle';

const MyArticles = () => {
  const queryClient = useQueryClient();

  const { isFetching, status, data } = useMyArticles();
  const { mutate: delMutate } = useDeleteArticle();
  const { mutate: postMutate } = usePostArticle();

  const postPost = (id) => {
    postMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('myArticles');
      },
    });
  };
  const deletePost = (id) => {
    delMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('myArticles');
      },
    });
  };

  if (isFetching) {
    return (
      <Box className="empty-array">
        <h2>We are loading articles</h2>
        <CircularProgress />
      </Box>
    );
  }
  if (status === 'error') return <p>Error :(</p>;

  if (data.length === 0) {
    return (
      <div className="empty-array">
        <h2>You don't have posted Articles</h2>
      </div>
    );
  }
  return (
    <div>
      <Box className="my-article">
        {data.map((singleArticle) => {
          return (
            <BlogThumbnailContent
              key={singleArticle.id}
              singleArticle={singleArticle}
              actionButtons={
                <>
                  <IconButton
                    component={Link}
                    to={`/articles/edit/${singleArticle.id}`}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    <EditOutlinedIcon fontSize="medium" />
                  </IconButton>

                  <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => deletePost(singleArticle.id)}
                  >
                    <DeleteForeverOutlinedIcon fontSize="medium" />
                  </IconButton>
                  {!singleArticle.publishedAt && (
                    <IconButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => postPost(singleArticle.id)}
                    >
                      <PostAddOutlinedIcon fontSize="medium" />
                    </IconButton>
                  )}
                </>
              }
            ></BlogThumbnailContent>
          );
        })}
      </Box>
    </div>
  );
};

export default MyArticles;
