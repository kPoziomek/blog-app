import { useMutation } from 'react-query';
import { deleteMyArticle } from '../helpers/axiosConfig';

const deleteMyArticleHook = (id) => {
  return deleteMyArticle(id).then((response) => {
    return response.data;
  });
};

export const useDeleteArticle = () => {
  return useMutation(deleteMyArticleHook, {
    mutationKey: 'deleteMyArticleHook',
  });
};
