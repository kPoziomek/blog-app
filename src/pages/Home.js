import React, { useEffect, useState } from 'react';
import './Home.css';
import Main from './components/Main';
import { getUserArticle } from '../helpers/axiosConfig';
import { Box, Card } from '@mui/material';
import Nav from './components/Nav';
import { Link } from 'react-router-dom';

const Home = () => {
  let [data, setData] = useState();
  useEffect(() => {
    getUserArticle()
      .then((res) => {
        let myData = res.data;
        return setData(myData);
      })
      .then((result) => {
        return result;
      });
  }, []);

  console.log(data);
  return (
    <>
      <Box>
        <Card>
          <Nav />

          <main className="main-container">
            {data
              ? data.map((arr, index) => (
                  <Link to={'/articles/' + arr.id} key={index}>
                    <Main arr={arr} key={index} />
                  </Link>
                ))
              : null}
          </main>

          <footer className="footer-container"></footer>
        </Card>
      </Box>
    </>
  );
};

export default Home;
