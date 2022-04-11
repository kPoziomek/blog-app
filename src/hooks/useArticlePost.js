import { useMutation } from 'react-query';
import { postSingleArticle } from '../helpers/axiosConfig';

const postMyArticleHook = (fData) => {
  return postSingleArticle(fData).then((data) => {
    return data.data;
  });
};

export const useArticlePost = () => {
  return useMutation(postMyArticleHook, { mutationKey: 'postMyArticleHook' });
};
