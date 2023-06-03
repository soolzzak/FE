import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
}

export interface SignupInfo {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  birthday: Date | undefined;
  gender: string | undefined;
  admin: boolean;
  adminkey: string | null;
}

export interface LoginInfo {
  email: string | undefined;
  password: string | undefined;
}

export const getAccessKey = () => Cookies.get('access_key');
export const getRefreshKey = () => Cookies.get('refresh_key');

// 토큰 필요한 인스턴스 (확인해보기)
export const privateInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    "access_key": getAccessKey(),
  },
});

export const SignupApi = async (signupInfo: SignupInfo) => {
  try {
    const response = await axiosInstance.post('/signup', signupInfo);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

export const LoginApi = async (loginInfo: LoginInfo) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
      '/login',
      loginInfo
    );
    const accessKey = response.headers.access_key;
    const refreshKey = response.headers.refresh_key;
    Cookies.set('accessKey', accessKey);
    Cookies.set('refreshKey', refreshKey);
    console.log(response)
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

export const LogoutApi = async () => {
  try {
    const config = {
      headers: {
        "access_key": getAccessKey(),
        "refresh_key": getRefreshKey()
      }
    } 
    await axiosInstance.get('/logout', config)
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
}

// 리프레시 토큰 요청 (body? header?)
export const getNewRefreshKey = async () => {
  const config = {
    headers: {
      "refresh_key" : getRefreshKey()
    }
  }
  const response = await axiosInstance.post('/refresh주소', config)
  console.log('리프레시 토큰 요청 응답: ', response)
  return response
};

// 토큰 인터셉터
privateInstance.interceptors.response.use (
  // 1.성공시
  (response) => response,

  // 2.실패
  async (error) => {
    const originRequest = error.config
    console.log('토큰 만료 인터셉터 오류 형태: ', error)

    // 토큰 만료 (메세지 확인)
    if (error.response.data.msg === '토큰만료') {
      const response = await getNewRefreshKey()

      // 리프레시 토큰 요청 성공 (메세지 확인)
      if (response.data.msg === '토큰 성공') {
        const newAccessKey = response.headers.access_key;
        Cookies.set('accessKey', newAccessKey);

        // 요청 이어하기
        originRequest.headers.access_key = getAccessKey()
        return axios(originRequest);
      } 
        // navigate('/signup')
        window.location.replace('/login')
    }
  return Promise.reject(error)
})