import React from 'react';
import ArticleForm from './components/ArticleForm';
const CreateArticle = () => {
  const data = {
    id: 2,
    type: 'create',
  };
  return <ArticleForm type={data} />;
};

export default CreateArticle;
