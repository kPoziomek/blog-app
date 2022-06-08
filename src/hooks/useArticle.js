import { useQuery } from 'react-query';
import { getSingleArticle } from '../helpers/axiosConfig';
import { useQueryClient } from 'react-query';
const getArticleById = async ({ queryKey }) => {
  return getSingleArticle(queryKey[1]).then((res) => {
    return res.data;
  });
};

export default function useArticle(articleId) {
  const queryClient = useQueryClient();
  const initialState = queryClient
    .getQueryData(['articles'])
    ?.find((d) => d.id === articleId);

  return useQuery(['article', articleId], getArticleById, {
    initialData: initialState,
  });
}
