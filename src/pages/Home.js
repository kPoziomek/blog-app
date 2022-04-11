import React from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';
import useArticleHook from '../hooks/useArticles';
import { Box, Card, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const { status, data, isLoading } = useArticleHook();

  if (isLoading) {
    return (
      <div className="empty-array">
        <h2>We don't have any posted articles yet</h2>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Box>
        <Card>
          <div className="main-container">
            {status === 'success' &&
              data.map((singleArticle) => {
                return (
                  <Link
                    className="main-articles"
                    to={`/articles/${singleArticle.id}`}
                    key={singleArticle.id}
                  >
                    <BlogThumbnailContent
                      singleArticle={singleArticle}
                      image={(singleArticle.image = true)}
                      key={singleArticle.id}
                    />
                  </Link>
                );
              })}
          </div>

          <footer className="footer-container"></footer>
        </Card>
      </Box>
    </>
  );
};

export default Home;
