import React from 'react';
import { useLocation } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';

const MyEditedArticle = () => {
  const { state } = useLocation();

  const data = {
    id: 1,
    type: 'edit',
  };
  return <ArticleForm type={data} formData={state} />;
};

export default MyEditedArticle;
