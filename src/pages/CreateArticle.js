import React from 'react';
import ArticleForm from './components/ArticleForm';
import { useNavigate } from 'react-router-dom';
import { postSingleArticle } from '../helpers/axiosConfig';
const CreateArticle = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    postSingleArticle(values).then((data) => {
      const { id } = data.data;
      navigate(`/articles/${id}`);
    });
  };
  return <ArticleForm title="Create Article" onSubmit={handleSubmit} />;
};

export default CreateArticle;
