import axios from 'axios';

const instance = axios.create();

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

export default instance;
