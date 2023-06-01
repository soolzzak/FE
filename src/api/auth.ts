import axios, { AxiosResponse } from 'axios';
import jwtDecode from "jwt-decode";
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

// token 함수
// export const getAccessKey = () => {
//   return Cookies.get("access_key")
// }
// export const getRefreshKey = () => {
//   return Cookies.get("refresh_key")
// }

export const SignupApi = async (signupInfo: SignupInfo) => {
  try {
    const response = await axiosInstance.post('/signup', signupInfo);
    return response;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) throw error;
  }
};

export const LoginApi = async (loginInfo: LoginInfo) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
      '/login',
      loginInfo
    );
    console.log(response.headers);
    console.log(response.data.msg);
    const accessKey = response.headers.access_key
    const refreshKey = response.headers.refresh_key;
    Cookies.set("accessKey", accessKey);
    Cookies.set("refreshKey", refreshKey);

    console.log(jwtDecode(accessKey));
    
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

// 유저 확인(token)
// export const confirmUser = () => {
//   const access_key = getAccessKey();
//   const refresh_key = getRefreshKey();
//   if (access_key && refresh_key) {
//     const userInfo = jwtDecode(access_key);
//     return userInfo;
//   } else {
//     return null;
//   }
// }