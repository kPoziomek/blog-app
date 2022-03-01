import React from 'react';
import ArticleForm from './components/ArticleForm';
import { useNavigate } from 'react-router-dom';
import { useArticleContext } from '../ArticleDataContext';
const CreateArticle = () => {
  const { createMyArticle } = useArticleContext();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    createMyArticle(values, { onSuccess: (id) => navigate(`/articles/${id}`) });
  };
  return <ArticleForm title="Create Article" onSubmit={handleSubmit} />;
};

export default CreateArticle;
