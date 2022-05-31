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
import { useFormik } from 'formik';
import * as yup from 'yup';

import './ArticleForm.css';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
const initialValues = { title: '', summary: '', content: '', publish: false };

const ArticleForm = ({ title, formData = initialValues, onSubmit }) => {
  const handlePostSend = (values) => {
    onSubmit(values);
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
    initialValues: formData,
    onSubmit: handlePostSend,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ m: 1 }}>
        <Card sx={{ minWidth: 400, maxWidth: 1200, mx: 'auto' }}>
          <AppBar position="static" className="article-nav">
            <Toolbar className="article-toolbar">
              <Typography variant="h6" noWrap component="div">
                {title}
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

            <TextField
              fullWidth
              className="article-elements"
              label="Content"
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
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
              <PublishOutlinedIcon sx={{ ml: 1 }} />
            </Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  );
};

export default ArticleForm;
