import axios from 'axios';
import config from '../config';
import { getCookie, clearCookie } from '../utils/cookie';

axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.baseURL = config.server.baseURL;

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = getCookie('accessToken');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response.status === 401) clearCookie();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
