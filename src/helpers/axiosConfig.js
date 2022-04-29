// import axios from 'axios';

import axios from 'axios';

class AxiosConfig {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/api',
    });
    this.instance.interceptors.request.use(
      (conf) => {
        const token = localStorage.getItem('token');
        if (token) {
          conf.headers.Authorization = `Bearer ${token}`;
        }
        return conf;
      },
      (error) => console.warn(error)
    );
  }
  loginUserAPI = (data) => {
    return this.instance.post('/auth/login', data);
  };

  authMe = () => {
    return this.instance.get('/auth/me');
  };
  getArticles = () => {
    return this.instance.get('/articles');
  };

  getSingleArticle = (id) => {
    return this.instance.get(`articles/${id}`);
  };
  postSingleArticle = (data) => {
    return this.instance.post('/articles', data);
  };
  getMyArticles = () => {
    return this.instance.get(`/articles/my`);
  };
  postMyArticle = (id) => {
    return this.instance.patch(`/articles/${id}/publish`);
  };

  deleteMyArticle = (id) => {
    return this.instance.delete(`/articles/${id}`);
  };
  editSingleArticle = (id, data) => {
    return this.instance.patch(`/articles/${id}`, data);
  };
}

export default AxiosConfig;
