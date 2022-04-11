import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { useParams } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import { editSingleArticle } from '../helpers/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import useArticle from '../hooks/useArticle';
const MyEditedArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useArticle(id);

  const editMutation = useMutation(
    id,
    (editedData) => {
      return editSingleArticle(id, editedData).then((data) => {
        return data.data;
      });
    },
    {
      onSuccess: (data) => {
        navigate(`/articles/${data.id}`);
      },
    }
  );

  const handleSubmit = (values) => {
    editMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <Box className="empty-array">
        <h2>Loading....</h2>
        <CircularProgress />
      </Box>
    );
  }

  const defaultData = {
    title: data.title,
    summary: data.summary,
    content: data.content,
    publish: !!data.publishedAt,
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
