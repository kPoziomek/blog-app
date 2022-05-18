import { Box, IconButton, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

import BlogThumbnailContent from '../pages/components/BlogThumbnailContent';
import './MyArticles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link, useParams } from 'react-router-dom';
import {
  getMyArticlesRedux,
  deleteMyArticleRedux,
  postMyArticleRedux,
} from '../features/articleSlice';
import {
  getMyArticles,
  loadingMyArticleSelector,
} from '../features/selectors.js';
import { useDispatch, useSelector } from 'react-redux';

const MyArticles = () => {
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(getMyArticlesRedux());
  }, [, dispatch]);

  const myArticles = useSelector(getMyArticles);
  const loadingMyArticles = useSelector(loadingMyArticleSelector);

  const postPost = (id) => {
    dispatch(postMyArticleRedux(id));
  };
  const deletePost = (id) => {
    dispatch(deleteMyArticleRedux(id));
  };

  if (loadingMyArticles) {
    return <CircularProgress />;
  }

  if (myArticles?.length === 0) {
    return (
      <div className="empty-array">
        <h2>You have not created any articles yet</h2>
      </div>
    );
  }

  return (
    <div>
      <Box className="my-article">
        {myArticles?.map((singleArticle) => {
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
