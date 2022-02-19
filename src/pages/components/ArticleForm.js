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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import UiQuillComponent from './QuillComponent';
import { postSingleArticle } from '../../helpers/axiosConfig';
const ArticleForm = (type) => {
  console.log('child', type);
  const navigate = useNavigate();

  const handlePostSend = (values) => {
    if (type.id === 2) {
      postSingleArticle(values).then((data) => {
        const { id } = data.data;
        navigate(`/articles/${id}`);
      });
    } else {
      console.log('dupsa');
    }
  };

  const validationSchema = yup.object({
    title: yup
      .string('write Title')
      .min(2, 'Write your title')
      .required('Title required'),
    content: yup
      .string('Write content')
      .min(2, 'Write your content')
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
    (childData) => {
      formik.setFieldValue('content', childData);
    },
    [formik]
  );
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
              fullWidth
              className="article-elements"
              label="Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <UiQuillComponent
              value={formik.values.content}
              onChange={handleContentChange}
              error={formik.touched.content && formik.errors.content}
            />
            <TextField
              fullWidth
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
          <CardActions>
            <Button
              className="article-submit"
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit Post
            </Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  );
};

export default ArticleForm;
