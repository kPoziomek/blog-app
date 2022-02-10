import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000',
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
export const getArticles = async () => {
  return instance.get('/articles');
};

export const getSingleArticle = (id) => {
  return instance.get(`articles/${id}`);
};
