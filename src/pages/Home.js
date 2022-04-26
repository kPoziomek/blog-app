import React, { useEffect } from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';

import { Box, Card, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticlesRedux } from '../features/articleSlice';
import { getArticles, loadingArticlesSelector } from '../features/selectors';
import { useApi } from '../contexts/ApiProvider';

const Home = () => {
  const dispatch = useDispatch();
  const articles = useSelector(getArticles);
  const loadingArticles = useSelector(loadingArticlesSelector);
  const api = useApi();
  useEffect(() => {
    dispatch(getAllArticlesRedux(api));
  }, [dispatch]);

  if (loadingArticles) {
    return <CircularProgress />;
  }

  if (!articles?.length) {
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
            {articles?.map((singleArticle) => {
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
