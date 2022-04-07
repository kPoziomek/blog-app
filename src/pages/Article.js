import { Avatar, Card, CardHeader, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleArticle } from '../helpers/axiosConfig';
import HomeIcon from '@mui/icons-material/Home';
import { getSingleArticleRedux } from '../features/articleSlice';
import './Article.css';
import { useDispatch, useSelector } from 'react-redux';

const Article = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { singleArticle, loadingSingleArticle } = useSelector(
    (state) => state.articles
  );
  const [articleData, setArticleData] = useState();
  useEffect(() => {
    dispatch(getSingleArticleRedux(id));
    getSingleArticle(id).then(({ data }) => {
      setArticleData(data);
    });
  }, [id]);

  if (typeof articleData !== 'object') {
    return (
      <div className="empty-array">
        <h2>We are looking for article </h2>
        {loadingSingleArticle && <CircularProgress />}
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

      {singleArticle && (
        <Card
          className="mainContainer"
          sx={{ mx: 'auto', p: 2, border: '1px dashed grey' }}
        >
          <CardHeader
            sx={{ maxWidth: 245 }}
            avatar={<Avatar />}
            title={`${singleArticle.author.firstName} ${singleArticle.author.lastName}`}
            subheader="02/02/2022"
          />

          <section>
            <h3>{singleArticle.title}</h3>
            <img src="" alt="" />
            <div dangerouslySetInnerHTML={{ __html: singleArticle.content }} />
          </section>
        </Card>
      )}
    </div>
  );
};

export default Article;
