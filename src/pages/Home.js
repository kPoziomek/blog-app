import React from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';
import { useArticles } from '../hooks/useArticles';
import { Box, Card, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import AlertComponent from '../helpers/AlertComponent';
import Footer from './components/Footer';

const Home = () => {
  const { data, isLoading, isError, error } = useArticles();
  console.log(data);

  if (isError) {
    console.dir(error.message);
    return <AlertComponent error={error} />;
  }

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
            {data?.map((singleArticle) => {
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

          <Footer className="footer-container">{data?.length}</Footer>
        </Card>
      </Box>
    </>
  );
};

export default Home;
