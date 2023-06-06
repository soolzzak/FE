import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    access_key: Cookies.get('accessKey'),
  },
});

export default instance;
