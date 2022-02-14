import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import './CreateArticle.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postSingleArticle } from '../helpers/axiosConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateArticle = () => {
  const handlePostSend = (values) => {
    postSingleArticle(values);
  };
  const validationSchema = yup.object({
    title: yup
      .string('write Title')
      .min(2, 'Write your title')
      .required('Title required'),
    content: yup
      .string('Write content')
      .min(10, 'Write your content')
      .required('Content required'),
    summary: yup
      .string('write summary')
      .min(2, 'Write your summary')
      .required('Summary required'),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: '',
      summary: '',
      content: '',
    },
    onSubmit: handlePostSend,
  });
  const handleContentChange = useCallback(
    (value) => {
      formik.setFieldValue('content', value);
    },
    [formik]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Card sx={{ minWidth: 400, maxWidth: 1200, mx: 'auto' }}>
          <CardContent>
            <TextField
              label="Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Box sm={{ height: 200 }}>
              <ReactQuill
                id="content"
                name="content"
                value={formik.values.content}
                onChange={handleContentChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
            </Box>
            <TextField
              label="Summary"
              id="summary"
              name="summary"
              value={formik.values.summary}
              onChange={formik.handleChange}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
            />
          </CardContent>
          <CardActions>
            <Button type="submit">Submit Post</Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  );
};

export default CreateArticle;
