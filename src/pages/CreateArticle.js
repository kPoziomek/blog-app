import React from 'react';
import ArticleForm from './components/ArticleForm';
const CArticle = () => {
  const data = {
    id: 2,
    type: 'create',
  };
  return <ArticleForm type={data} />;
};

export default CArticle;
