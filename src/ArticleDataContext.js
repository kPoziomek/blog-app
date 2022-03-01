import React, { useCallback, useContext, useMemo, useState } from 'react';
import * as requests from './helpers/axiosConfig';

const ArticleDataContext = React.createContext();

export function useArticleContext() {
  return useContext(ArticleDataContext);
}

const NOOP = () => {};
export function ArticleDataProvider({ children }) {
  const [myArticles, setMyArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState(null);

  const createMyArticle = useCallback((values, { onSuccess = NOOP } = {}) => {
    requests.postSingleArticle(values).then((data) => {
      const { id } = data.data;
      onSuccess(id);
    });
  }, []);

  const getSingleArticle = useCallback((id) => {
    requests.getSingleArticle(id).then(({ data }) => {
      setSingleArticle(data);
    });
  }, []);

  const getAllArticles = useCallback(() => {
    requests.getArticles().then((res) => {
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

  const getMySingleArticle = useCallback(() => {
    requests.getMyArticles().then((response) => {
      let articlesData = response.data;
      const normalizedArticles = articlesData.map((singleElement) => {
        const { id, title, summary, content, publishedAt } = singleElement;
        return {
          id,
          title,
          summary,
          content,
          publishedAt,
        };
      });
      setMyArticles(normalizedArticles);
    });
  }, []);

  const deleteArticle = useCallback((id) => {
    requests.deleteMyArticle(id).then((response) => {
      if (response.status === 200) {
        setMyArticles((prev) => {
          return prev.filter((article) => {
            return article.id !== id;
          });
        });
      }
    });
  }, []);

  const postMySingleArticle = useCallback((id) => {
    requests.postMyArticle(id).then((res) => {
      if (res.status === 200) {
        const updatedArticle = res.data;

        setMyArticles((prev) => {
          return prev.map((element) => {
            return element.id === updatedArticle.id ? updatedArticle : element;
          });
        });
      }
    });
  }, []);
  const value = useMemo(
    () => ({
      deleteArticle,
      postMySingleArticle,
      allArticles,
      getAllArticles,
      myArticles,
      getMySingleArticle,
      createMyArticle,
      singleArticle,
      getSingleArticle,
    }),
    [
      postMySingleArticle,
      deleteArticle,
      allArticles,
      getAllArticles,
      myArticles,
      getMySingleArticle,
      createMyArticle,
      singleArticle,
      getSingleArticle,
    ]
  );
  return (
    <ArticleDataContext.Provider value={value}>
      {children}
    </ArticleDataContext.Provider>
  );
}
