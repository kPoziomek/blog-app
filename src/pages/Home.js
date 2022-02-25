import React, { useEffect, useState } from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';
import { getArticles } from '../helpers/axiosConfig';
import { Box, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  let [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    getArticles().then((res) => {
      let articlesData = res.data;
      const normalizedArticles = articlesData.map((singleElement) => {
        const { id, title, summary, content, author } = singleElement;
        return {
          id,
          title,
          summary,
          content,
          authorFirstName: author.firstName,
          authorLastName: author.lastName,
          image: true,
        };
      });
      setAllArticles(normalizedArticles);
    });
  }, []);

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
