import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

instance.interceptors.request.use(
  (conf) => {
    const token = localStorage.getItem('token');
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  (error) => console.warn(error)
);

export const loginUserAPI = (data) => {
  return instance.post('/auth/login', data);
};

export const authMe = () => {
  return instance.get('/auth/me');
};
export const getArticles = () => {
  return instance.get('/articles');
};

export const getSingleArticle = (id) => {
  return instance.get(`articles/${id}`);
};
export const postSingleArticle = (data) => {
  return instance.post('/articles', data);
};
export const getMyArticles = () => {
  return instance.get(`/articles/my`);
};
export const postMyArticle = (id) => {
  return instance.patch(`/articles/${id}/publish`);
};

export const deleteMyArticle = (id) => {
  return instance.delete(`/articles/${id}`);
};
export const editSingleArticle = (id, data) => {
  return instance.patch(`/articles/${id}`, data);
};
