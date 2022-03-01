import React, { useEffect } from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';
import { Box, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { useArticleContext } from '../ArticleDataContext';

const Home = () => {
  const { allArticles, getAllArticles } = useArticleContext();
  useEffect(() => {
    getAllArticles();
  }, [getAllArticles]);

  if (allArticles.length === 0) {
    return (
      <div className="empty-array">
        <h2>We don't have any posted articles yet</h2>
      </div>
    );
  }
  return (
    <>
      <Box>
        <Card>
          <div className="main-container">
            {allArticles.map((singleArticle) => {
              return (
                <Link
                  className="main-articles"
                  to={'/articles/' + singleArticle.id}
                  key={singleArticle.id}
                >
                  <BlogThumbnailContent
                    singleArticle={singleArticle}
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
