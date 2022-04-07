import { Box, IconButton, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import BlogThumbnailContent from '../pages/components/BlogThumbnailContent';
import './MyArticles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from 'react-router-dom';
import {
  getMyArticlesRedux,
  deleteMyArticleRedux,
  postMyArticleRedux,
} from '../features/articleSlice';

import { useDispatch, useSelector } from 'react-redux';

const MyArticles = () => {
  const dispatch = useDispatch();
  const { myArticlesState, loadingMyArticle } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(getMyArticlesRedux());
  }, [dispatch, myArticlesState]);

  const postPost = (id) => {
    dispatch(postMyArticleRedux(id));
  };
  const deletePost = (id) => {
    dispatch(deleteMyArticleRedux(id));
  };
  if (myArticlesState?.length === 0) {
    return (
      <div className="empty-array">
        <h2>You have not created any articles yet</h2>
        {loadingMyArticle && <CircularProgress />}
      </div>
    );
  }
  return (
    <div>
      <Box className="my-article">
        {myArticlesState.map((singleArticle) => {
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
