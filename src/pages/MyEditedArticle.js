import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import { getSingleArticle, editSingleArticle } from '../helpers/axiosConfig';
import { useNavigate } from 'react-router-dom';
const MyEditedArticle = () => {
  const [singleArticleData, setSingleArticleData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleArticle(id).then(({ data }) => setSingleArticleData(data));
  }, [id]);

  const handleSubmit = (values) => {
    editSingleArticle(id, values).then((data) => {
      const { id } = data.data;
      navigate(`/articles/${id}`);
    });
  };

  if (singleArticleData === null) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  const defaultData = {
    title: singleArticleData.title,
    summary: singleArticleData.summary,
    content: singleArticleData.content,
    publish: !!singleArticleData.publishedAt,
  };
  return (
    <ArticleForm
      title="Edit Article"
      formData={defaultData}
      onSubmit={handleSubmit}
    />
  );
};

export default MyEditedArticle;
