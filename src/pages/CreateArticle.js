import React, { useCallback } from 'react';
import ArticleForm from './components/ArticleForm';
import { useNavigate } from 'react-router-dom';
import { postArticleRedux } from '../features/articleSlice';
import { navToHomePage } from '../features/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
const CreateArticle = () => {
  const navToHome = useSelector(navToHomePage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(postArticleRedux(values));
    if (!navToHome) {
      navigate('/');
    }
  };

  return <ArticleForm title="Create Article" onSubmit={handleSubmit} />;
};

export default CreateArticle;
