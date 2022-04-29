import { Avatar, Card, CardHeader, CircularProgress } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import dompurify from 'dompurify';
import HomeIcon from '@mui/icons-material/Home';
import { getSingleArticleRedux } from '../features/articleSlice';
import './Article.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticle,
  loadingSingleArticleSelector,
} from '../features/selectors';
import { useApi } from '../contexts/ApiProvider';

const Article = () => {
  const dispatch = useDispatch();
  const { author, title, content } = useSelector(getArticle);
  const loadingSingleArticle = useSelector(loadingSingleArticleSelector);
  let { id } = useParams();
  const api = useApi();

  const normalizedObject = { id, api };

  const sanitizer = dompurify.sanitize;
  useEffect(() => {
    dispatch(getSingleArticleRedux(normalizedObject));
  }, [dispatch]);

  if (loadingSingleArticle) {
    return <CircularProgress />;
  }

  if (isEmpty(author)) {
    return (
      <div className="empty-array">
        <h2>We are looking for article </h2>
      </div>
    );
  }

  return (
    <div className="mainArticle">
      <header className="article-header">
        <Avatar
          className="mainAvatar"
          sx={{ bgcolor: '#2196f3' }}
          aria-label="recipe"
        >
          <Link to="/">
            <HomeIcon sx={{ color: '#fff' }} />
          </Link>
        </Avatar>
      </header>

      {
        <Card
          className="mainContainer"
          sx={{ mx: 'auto', p: 2, border: '1px dashed grey' }}
        >
          <CardHeader
            sx={{ maxWidth: 245 }}
            avatar={<Avatar />}
            title={`${author.firstName} ${author.lastName}`}
            subheader="02/02/2022"
          />

          <section>
            <h3>{title}</h3>
            <img src="" alt="" />
            <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
          </section>
        </Card>
      }
    </div>
  );
};

export default Article;
