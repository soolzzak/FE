import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshinstance: AxiosInstance = axios.create({
  baseURL: 'https://api.honsoolzzak.com/api',
  withCredentials: true,
  headers: {
    refresh_key: Cookies.get('refreshKey'),
  },
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

instance.interceptors.response.use(
    (response) => response,
  
    // 2.실패
    async (error) => {
      const originRequest = error.config;
      console.log('토큰 만료 인터셉터 오류 형태: ', error);
      console.log('status?',error.response.status)
      // 토큰 만료 (메세지 확인)
      if (error.response.data.status === 401) {
        const response = await refreshinstance.post('/getAccessToken');
        console.log('refresh??',response)
        // 리프레시 토큰 요청 성공 (메세지 확인)
        if (response.data.status === 200) {
          const newAccessKey = response.headers.access_key;
          Cookies.set('accessKey', newAccessKey);
          return axios(originRequest);
        }
        window.location.replace('/');
      }
      return Promise.reject(error);
    }
  );

export default instance;