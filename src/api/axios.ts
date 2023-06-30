import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
// import Cookies from 'js-cookie';

const API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': 'https://api.honsoolzzak.com',
  },
  baseURL: API_URL,
  withCredentials: true,
});

// const refreshinstance: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: {
//     refresh_key: Cookies.get('refreshKey'),
//   },
// });

// // Add a request interceptor
// instance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = Cookies.get('accessKey');
//     if (token) {
//       // eslint-disable-next-line no-param-reassign
//       config.headers.access_key = token;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originRequest = error.config;

//     if (error.response.status === 401 || error.response.status === 403) {
//       const response = await refreshinstance.post('/getAccessToken');

//       if (response.data.status === 200) {
//         const newAccessKey = response.headers.access_key;
//         Cookies.set('accessKey', newAccessKey);
//         originRequest.headers.access_key = newAccessKey;
//         return axios(originRequest);
//       }
//       window.location.replace('/');
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
