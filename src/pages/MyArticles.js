import { Box, IconButton } from '@mui/material';
import React, { useEffect } from 'react';

import BlogThumbnailContent from '../pages/components/BlogThumbnailContent';
import './MyArticles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useArticleContext } from '../ArticleDataContext';
import { Link } from 'react-router-dom';

const MyArticles = () => {
 const { deleteArticle, postMySingleArticle, getMySingleArticle, myArticles } = useArticleContext();
  useEffect(() => {
    getMySingleArticle();
  }, [getMySingleArticle]);

  if (myArticles.length === 0) {
    return (
      <div className="empty-array">
        <h2>You have not created any articles yet</h2>
      </div>
    );
  }
  return (
    <div>
      <Box className="my-article">
        {myArticles.map((singleArticle) => {
          return (
            <BlogThumbnailContent
    key={singleArticle.id}
    singleArticle={singleArticle}
    actionButtons={
        <>
            <IconButton
                component={Link}
                to={`/articles/edit/${singleArticle.id}`}
                size="small"
                variant="contained"
                color="primary"
            >
                <EditOutlinedIcon fontSize="medium"/>
            </IconButton>

            <IconButton
                size="small"
                variant="contained"
                color="primary"
                onClick={() => deleteArticle(singleArticle.id)}
            >
                <DeleteForeverOutlinedIcon fontSize="medium"/>
            </IconButton>
            {!singleArticle.publishedAt && (
                <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        return postMySingleArticle(singleArticle.id);
                    }}
                >
                    <PostAddOutlinedIcon fontSize="medium"/>
                </IconButton>
            )}
        </>
    }
    />
          );
        })}
      </Box>
    </div>
  );
};

export default MyArticles;
