import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardHeader,
  SvgIcon,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postSingleArticle } from '../helpers/axiosConfig';

const MoreVertIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </SvgIcon>
  );
};

const CreateArticle = () => {
  const handlePostSend = (values) => {
    postSingleArticle(values);
    console.log(values);
  };
  const validationSchema = yup.object({});
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: '',
      summary: '',
      content: '',
    },
    onSubmit: handlePostSend,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Card sx={{ minWidth: 400, maxWidth: 1200, mx: 'auto' }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Create your post"
          ></CardHeader>
          <CardContent>
            <Typography>id</Typography>
            <Typography>createdAt</Typography>
            <Typography>updatedAt</Typography>
            <Typography>publishedAt</Typography>

            <TextField
              label="Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <TextField
              label="Content"
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            />

            <Typography>authorId</Typography>
            <TextField
              label="Summary"
              id="summary"
              name="summary"
              value={formik.values.summary}
              onChange={formik.handleChange}
            />
          </CardContent>
          <CardActions>
            <Button type="submit">Submit Post</Button>
          </CardActions>{' '}
        </Card>
      </Box>
    </form>
  );
};

export default CreateArticle;
