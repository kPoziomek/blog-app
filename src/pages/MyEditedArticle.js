import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import { Box, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleArticleRedux,
  editSingleArticleRedux,
} from '../features/articleSlice';
import {
  getArticle,
  isEditedArticleSelector,
  loadingSingleArticleSelector,
} from '../features/selectors';

const MyEditedArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector(getArticle);
  const isEdited = useSelector(isEditedArticleSelector);
  const loadingSingleArticle = useSelector(loadingSingleArticleSelector);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleArticleRedux({ id }));
  }, [dispatch]);

  useEffect(() => {
    isEdited && navigate(`/articles/${id}`);
  }, [id, isEdited, navigate]);

  const handleSubmit = (editedData) => {
    dispatch(editSingleArticleRedux({ id, editedData }));
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
    title: article.title,
    summary: article.summary,
    content: article.content,
    publish: !!article.publishedAt,
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
