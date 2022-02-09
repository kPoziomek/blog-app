import React from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
  // get.article with id

  let { id } = useParams();
  return <div>test {id}</div>;
};

export default Article;
