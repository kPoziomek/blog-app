import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleArticle } from '../helpers/axiosConfig';
import HomeIcon from '@mui/icons-material/Home';
import ReactMarkdown from 'react-markdown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './Article.css';

const Article = () => {
  let { id } = useParams();
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    getSingleArticle(id).then(({ data }) => {
      setArticleData(data);
    });
  }, [id]);

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

      {articleData && (
        <Card
          className="mainContainer"
          sx={{ mx: 'auto', p: 2, border: '1px dashed grey' }}
        >
          <CardHeader
            sx={{ maxWidth: 245 }}
            avatar={<Avatar />}
            title={`${articleData.author.firstName} ${articleData.author.lastName}`}
            subheader="02/02/2022"
          />

          <section>
            <ReactMarkdown children={articleData.title} />
            <img src="" alt="" />
            <ReactQuill
              value={articleData.content}
              readOnly={true}
              theme={'bubble'}
            />
          </section>
        </Card>
      )}
    </div>
  );
};

export default Article;
