import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  AppBar,
  Typography,
  Toolbar,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import './CreateArticle.css';
import * as yup from 'yup';
import { postSingleArticle } from '../helpers/axiosConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CreateArticle = () => {
  const navigate = useNavigate();
  const handlePostSend = (values) => {
    postSingleArticle(values).then((data) => {
      const { id } = data.data;
      navigate(`/articles/${id}`);
    });
  };
  const validationSchema = yup.object({
    title: yup
      .string('write Title')
      .min(2, 'Write your title')
      .required('Title required'),
    content: yup
      .string('Write content')
      .min(2, 'Write your title')
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
      publish: false,
    },
    onSubmit: handlePostSend,
  });
  const handleContentChange = useCallback(
    (value) => {
      formik.setFieldValue('content', value);
    },
    [formik]
  );

  let errorClass = classNames({
    error: formik.touched.content && Boolean(formik.errors.content),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ m: 1 }}>
        <Card sx={{ minWidth: 400, maxWidth: 1200, mx: 'auto' }}>
          <AppBar position="static" className="article-nav">
            <Toolbar className="article-toolbar">
              <Typography variant="h6" noWrap component="div">
                Create your post
              </Typography>
            </Toolbar>
          </AppBar>
          <CardContent className="article-content">
            <FormControlLabel
              className="article-elements"
              control={
                <Checkbox
                  id="post"
                  name="publish"
                  checked={formik.values.publish}
                  onChange={formik.handleChange}
                />
              }
              label="Post"
            />
            <TextField
              className="article-elements"
              label="Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Box sm={{ height: 200 }}>
              <div className={errorClass}>
                <ReactQuill
                  id="content"
                  name="content"
                  value={formik.values.content}
                  onChange={handleContentChange}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  helperText={formik.touched.content && formik.errors.content}
                />
              </div>
              {formik.touched.content && Boolean(formik.errors.content) && (
                <p className="showText">{formik.errors.content}</p>
              )}
            </Box>
            <TextField
              className="article-elements"
              label="Summary"
              id="summary"
              name="summary"
              value={formik.values.summary}
              onChange={formik.handleChange}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
            />
          </CardContent>
          <CardActions className="article-submit">
            <Button type="submit" variant="contained" color="primary">
              Submit Post
            </Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  );
};

export default CreateArticle;
