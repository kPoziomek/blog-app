import {
  Container,
  Box,
  SvgIcon,
  Avatar,
  Button,
  Card,
  CardHeader,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleArticle } from '../helpers/axiosConfig';
import './Article.css';
const HomeIconArticle = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />ś
    </SvgIcon>
  );
};

const Article = () => {
  let { id } = useParams();
  const [articleData, setArticleData] = useState();

  // get.article with id
  useEffect(() => {
    getSingleArticle(id)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let myArticle = data;
        return setArticleData(myArticle);
      });
  }, []);

  console.log(articleData);

  return (
    <div className="mainArticle">
      <header className="article-header">
        <div></div>
        <Avatar
          className="mainAvatar"
          sx={{ bgcolor: '#2196f3' }}
          aria-label="recipe"
        >
          <Link to="/">
            <HomeIconArticle sx={{ color: '#fff' }}></HomeIconArticle>
          </Link>
        </Avatar>
      </header>

      {articleData ? (
        <Card
          className="mainContainer"
          sx={{ mx: 'auto', p: 2, border: '1px dashed grey' }}
        >
          <CardHeader
            sx={{ maxWidth: 245 }}
            avatar={<Avatar></Avatar>}
            title={`${articleData.author.firstName} ${articleData.author.lastName}`}
            subheader="02/02/2022"
          />

          <section>
            {articleData.title} {id}
            <img src="" alt="" />
            <div>
              <p>{articleData.content} </p>
            </div>
          </section>
        </Card>
      ) : null}
    </div>
  );
};

export default Article;
