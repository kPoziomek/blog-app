import React from 'react';
import ArticleForm from './components/ArticleForm';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';

const CreateArticle = () => {
  const api = useApi();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    api.postSingleArticle(values).then((data) => {
      const { id } = data.data;
      navigate(`/articles/${id}`);
    });
  };
  return <ArticleForm title="Create Article" onSubmit={handleSubmit} />;
};

export default CreateArticle;
