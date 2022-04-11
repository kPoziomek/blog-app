import React from 'react';
import ArticleForm from './components/ArticleForm';
import { useNavigate } from 'react-router-dom';
import { useArticlePost } from '../hooks/useArticlePost';

const CreateArticle = () => {
  const navigate = useNavigate();
  const { mutate } = useArticlePost();

  const handleSubmit = (postData) => {
    mutate(postData, {
      onSuccess: (postData) => {
        navigate(`/articles/${postData.id}`);
      },
    });
  };

  return <ArticleForm title="Create Article" onSubmit={handleSubmit} />;
};

export default CreateArticle;
