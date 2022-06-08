import { useQuery } from 'react-query';
import { getMyArticles } from '../helpers/axiosConfig';
import { normalizeArticles } from '../helpers/normalizeArticle';
const getMyArticlesHook = () => {
  return getMyArticles().then((response) => {
    return normalizeArticles(response.data);
  });
};

export default function useMyArticles() {
  return useQuery('myArticles', getMyArticlesHook);
}
