import { Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMyArticles } from '../helpers/axiosConfig';
import BlogThumbnailContent from '../pages/components/BlogThumbnailContent';
import './MyArticles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from 'react-router-dom';

import { deleteMyArticle, postMyArticle } from '../helpers/axiosConfig';

const MyArticles = () => {
  const [myArticles, setMyArticles] = useState([]);

  useEffect(() => {
    getMyArticles().then((response) => {
      let articlesData = response.data;
      const normalizedArticles = articlesData.map((singleElement) => {
        const { id, title, summary, content, publishedAt } = singleElement;
        return {
          id,
          title,
          summary,
          content,
          publishedAt,
        };
      });
      setMyArticles(normalizedArticles);
    });
  }, []);

  const postPost = (id) => {
    postMyArticle(id).then((res) => {
      if (res.status === 200) {
        const updatedArticle = res.data;
        setMyArticles((prev) => {
          return prev.map((element) => {
            return element.id === updatedArticle.id ? updatedArticle : element;
          });
        });
      }
    });
  };
  const deletePost = (id) => {
    deleteMyArticle(id).then((response) => {
      if (response.status === 200) {
        setMyArticles((prev) => {
          return prev.filter((article) => {
            return article.id !== id;
          });
        });
      }
    });
  };
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
                    <EditOutlinedIcon fontSize="medium" />
                  </IconButton>

                  <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => deletePost(singleArticle.id)}
                  >
                    <DeleteForeverOutlinedIcon fontSize="medium" />
                  </IconButton>
                  {!singleArticle.publishedAt && (
                    <IconButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => postPost(singleArticle.id)}
                    >
                      <PostAddOutlinedIcon fontSize="medium" />
                    </IconButton>
                  )}
                </>
              }
            ></BlogThumbnailContent>
          );
        })}
      </Box>
    </div>
  );
};

export default MyArticles;
