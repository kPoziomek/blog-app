import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useUserContext } from '../UserContext';
import { useArticleContext } from '../ArticleDataContext';
import './Article.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArticleButton from './components/UI/ArticleButton';

const Article = () => {
  const { deletePost, postPost, singleArticle, getSingleArticle } =
    useArticleContext();
  const { userId } = useUserContext();
  let { id } = useParams();

  useEffect(() => {
    getSingleArticle(id);
  }, [id, getSingleArticle]);

  if (!singleArticle) {
    return null;
  }

  const formattedDate = new Date(
    singleArticle.publishedAt
  ).toLocaleDateString();

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
          <div>
            <CardHeader
              sx={{ maxWidth: 245 }}
              avatar={<Avatar />}
              title={`${singleArticle.author.firstName} ${singleArticle.author.lastName}`}
              subheader={formattedDate}
            />
            {userId === singleArticle.author.id ? (
              <div>
                <ArticleButton
                  component={Link}
                  to={`/articles/edit/${singleArticle.id}`}
                  icon={<EditOutlinedIcon />}
                />
                <ArticleButton
                  icon={<DeleteForeverOutlinedIcon />}
                  handleClick={() => deletePost(singleArticle.id)}
                />
                {!singleArticle.publishedAt && (
                  <ArticleButton
                    icon={<PostAddOutlinedIcon />}
                    handleClick={() => postPost(singleArticle.id)}
                  />
                )}
              </div>
            ) : null}
          </div>

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
