import { Avatar, Box, Card, CardHeader, CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useParams } from 'react-router';
import './Article.css';
import useArticle from '../hooks/useArticle';

const Article = () => {
  const { id } = useParams();

  const { isLoading, data } = useArticle(id);

  if (isLoading) {
    return (
      <Box className="empty-array">
        <h2>Loading....</h2>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className="mainArticle">
      <header className="article-header">
        <Avatar
          as={Link}
          className="mainAvatar"
          sx={{ bgcolor: '#2196f3' }}
          aria-label="recipe"
          to="/"
        >
          <HomeIcon sx={{ color: '#fff' }} />
        </Avatar>
      </header>

      {data && (
        <Card
          className="mainContainer"
          sx={{ mx: 'auto', p: 2, border: '1px dashed grey' }}
        >
          <CardHeader
            sx={{ maxWidth: 245 }}
            avatar={<Avatar />}
            title={
              data.authorFullName
                ? data.authorFullName
                : `${data.author.firstName} ${data.author.firstName}`
            }
            subheader={new Date(data.publishedAt).toLocaleDateString()}
          />

          <section>
            <h3>{data.title}</h3>
            <img src="" alt="" />
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </section>
        </Card>
      )}
    </div>
  );
};

export default Article;
