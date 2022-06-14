import React, { useEffect } from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';

import { Box, Card, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  draftSafeSelector,
  getMyArticlesRedux,
} from '../features/articleSlice';
import { loadingMyArticleSelector, getMyArticles } from '../features/selectors';

const Home = () => {
  const dispatch = useDispatch();

  const myArticles = useSelector(getMyArticles);
  const draftedArticles = draftSafeSelector(myArticles);
  const loadingArticles = useSelector(loadingMyArticleSelector);

  useEffect(() => {
    dispatch(getMyArticlesRedux());
  }, [dispatch]);

  if (loadingArticles) {
    return <CircularProgress />;
  }

  if (!draftedArticles.length) {
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
            {draftedArticles?.map((singleArticle) => {
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
