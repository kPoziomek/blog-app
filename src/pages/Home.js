import React, { useEffect, useState } from 'react';
import './Home.css';
import BlogThumbnailContent from './components/BlogThumbnailContent';
import { getArticles } from '../helpers/axiosConfig';
import { Box, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  let [data, setData] = useState();
  useEffect(() => {
    getArticles().then((res) => {
      let myData = res.data;
      setData(myData);
    });
  }, []);

  return (
    <>
      <Box>
        <Card>
          <div className="main-container">
            {data &&
              data.map((arr, index) => (
                <Link
                  className="main-articles"
                  to={'/articles/' + arr.id}
                  key={index}
                >
                  <BlogThumbnailContent arr={arr} key={index} />
                </Link>
              ))}
          </div>

          <footer className="footer-container"></footer>
        </Card>
      </Box>
    </>
  );
};

export default Home;
