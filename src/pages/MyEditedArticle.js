import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import { Box, CircularProgress } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleArticleRedux,
  editSingleArticleRedux,
} from '../features/articleSlice';

const MyEditedArticle = () => {
  const dispatch = useDispatch();
  const {
    singleArticle,
    loadingSingleArticle,
    editedArticle,
    loadingEditedArticle,
  } = useSelector((state) => state.articles);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleArticleRedux(id));
  }, [id]);

  const handleSubmit = (values) => {
    dispatch(editSingleArticleRedux({ id, values }));
  };

  if (loadingSingleArticle) {
    return (
      <Box sx={{ p: 1, m: 1, display: 'flex', justifyContent: 'center' }}>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    );
  }
  const defaultData = {
    title: singleArticle.title,
    summary: singleArticle.summary,
    content: singleArticle.content,
    publish: !!singleArticle.publishedAt,
  };
  return (
    <ArticleForm
      title="Edit Article"
      formData={defaultData}
      onSubmit={handleSubmit}
    />
  );
};

export default MyEditedArticle;
