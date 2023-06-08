import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('accessKey');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.ACCESS_KEY = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
