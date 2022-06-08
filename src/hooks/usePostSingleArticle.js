import { useMutation } from 'react-query';
import { editSingleArticle } from '../helpers/axiosConfig';

const postMySingleArticleHook = ({ id, editedData }) => {
  return editSingleArticle(id, editedData).then((data) => {
    return data.data;
  });
};

export const usePostSingleArticle = (options = {}) => {
  return useMutation(postMySingleArticleHook, {
    mutationKey: 'postMySingleArticleHook',
    ...options,
  });
};
