import axios, { AxiosInstance, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import axiosInstance from './axios';

export interface ApiResponse {
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

export interface EmailInfo {
  email: string | undefined;
}

export interface ChangePwdInfo {
  email: string | undefined;
  password: string | undefined;
}

export const SignupApi = async (signupInfo: SignupInfo) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
      '/signup',
      signupInfo
    );
    return response;
  } catch (error) {
    throw error as Error;
  }
};

export const UsernameConfirm = async (username: string) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/signup?username=${username}`
    );
    return response;
  } catch (error) {
    throw error as Error;
  }
};

export const EmailSignupConfirm = async (email: EmailInfo) => {
  try {
    const response = await axiosInstance.post('/signup/mailconfirm', email);
    return response.data.code;
  } catch (error) {
    throw error as Error;
  }
};

export const EmailLoginConfirm = async (email: EmailInfo) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/login/mailconfirm', email);
    return response.data.code;
  } catch (error) {
    // console.log(error);
    throw error as Error;
  }
};

export const ChangePassword = async (changePwdInfo: ChangePwdInfo) => {
  try {
    const response = await axiosInstance.put('/change_password', changePwdInfo);
    return response;
  } catch (error) {
    throw error as Error;
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
    const decodedAccessToken: { exp: number } = jwtDecode(accessKey);
    const decodedRefreshToken: { exp: number } = jwtDecode(refreshKey);
    const accessExp = decodedAccessToken.exp;
    const refreshExp = decodedRefreshToken.exp;
    const accessExpireDate = new Date(accessExp * 1000);
    const refreshExpireDate = new Date(refreshExp * 1000);
    Cookies.set('accessKey', accessKey, {
      expires: accessExpireDate,
    });
    Cookies.set('refreshKey', refreshKey, {
      expires: refreshExpireDate,
    });
    return response;
  } catch (error) {
    throw error as Error;
  }
};

export const LogoutApi = async () => {
  try {
    const config = {
      headers: {
        access_key: Cookies.get('accessKey'),
        refresh_key: Cookies.get('refreshKey'),
      },
    };
    await axiosInstance.get('/logout', config);
    Cookies.remove('accessKey');
    Cookies.remove('refreshKey');
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

const refreshinstance: AxiosInstance = axios.create({
  baseURL: 'https://api.honsoolzzak.com/api',
  withCredentials: true,
  headers: {
    refresh_key: Cookies.get('refreshKey'),
  },
});

export const getNewAccessKey = async () => {
  try {
    const response: AxiosResponse<ApiResponse> = await refreshinstance.post(
      '/getAccessToken'
    );
    const accessKey = response.headers.access_key;
    Cookies.set('accessKey', accessKey);
    // console.log(response);
    return response;
  } catch (error) {
    return error as Error
  }
};

// // 토큰 인터셉터
// axiosInstance.interceptors.response.use(
//   // 1.성공시
//   (response) => response,

//   // 2.실패
//   async (error) => {
//     const originRequest = error.config;
//     console.log('토큰 만료 인터셉터 오류 형태: ', error);

//     // 토큰 만료 (메세지 확인)
//     if (error.response.data.msg === '토큰만료') {
//       const response = await getNewAccessKey();

//       // 리프레시 토큰 요청 성공 (메세지 확인)
//       if (response.data.msg === '토큰 성공') {
//         const newAccessKey = response.headers.access_key;
//         Cookies.set('accessKey', newAccessKey);

//         // 요청 이어하기
//         originRequest.headers.access_key = getNewAccessKey();
//         return axios(originRequest);
//       }
//       // navigate('/signup')
//       window.location.replace('/login');
//     }
//     return Promise.reject(error);
//   }
// );
