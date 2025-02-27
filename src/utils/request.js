import axios from 'axios';

class Request {
  constructor(config) {
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  setupInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
      },
      error => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      response => response.data,
      error => {
        const message = error.response?.data?.message || '请求失败';
        return Promise.reject({ message, error });
      }
    );
  }

  get(url, config) {
    return this.instance.get(url, config);
  }

  post(url, data, config) {
    return this.instance.post(url, data, config);
  }
}

export default new Request({
  baseURL: import.meta.env.VITE_API_BASE||'/',
  timeout: 10000
});