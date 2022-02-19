import React from 'react';
import ArticleForm from './components/ArticleForm';

const MyEditedArticle = () => {
  const data = {
    id: 1,
    type: 'edit',
  };
  return (
    <div>
      MyEditedArticle
      <ArticleForm type={data} />
    </div>
  );
};

export default MyEditedArticle;
