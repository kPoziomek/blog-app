import { useQuery } from 'react-query';
import { getArticles } from '../helpers/axiosConfig';
import { normalizeArticles } from '../helpers/normalizeArticle';
const getArticlesHook = async () => {
  return getArticles().then((res) => {
    return normalizeArticles(res.data);
  });
};

export default function useArticles() {
  return useQuery('articles', getArticlesHook, { refetchOnWindowFocus: true });
}
