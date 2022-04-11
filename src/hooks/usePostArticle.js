import { useMutation } from 'react-query';
import { postMyArticle } from '../helpers/axiosConfig';

const postMyArticleHook = (id) => {
  return postMyArticle(id).then((res) => {
    return res.data;
  });
};

export const usePostArticle = () => {
  return useMutation(postMyArticleHook, {
    mutationKey: 'usePostArticle',
  });
};
