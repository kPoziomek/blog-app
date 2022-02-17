import React from 'react';
import ArticleForm from './components/ArticleForm';
const CArticle = () => {
  const data = {
    id: 2,
    type: 'create',
  };
  return (
    <div>
      Article Create FORM
      <ArticleForm type={data} />
    </div>
  );
};

export default CArticle;
