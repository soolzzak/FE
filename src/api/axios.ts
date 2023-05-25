import axios, { AxiosInstance } from 'axios';

const API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
