import { useQuery } from 'react-query';
import { getArticles } from '../helpers/axiosConfig';
import { normalizeArticles } from '../helpers/normalizeArticle';
const getArticlesHook = async () => {
  return getArticles().then((res) => {
    return normalizeArticles(res.data);
  });
};

export const useArticles = (options = {}) => {
  const queryTest = useQuery(['articles'], getArticlesHook, options);
  return {
    ...queryTest,

    useErrorBoundary: (error) => error.response?.status >= 500,
    refetchOnWindowFocus: true,
  };
};
