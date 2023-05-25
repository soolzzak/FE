import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
}

export interface SignupInfo {
  username: string;
  password: string;
  email: string;
  logintype: string;
  isAdmin: boolean;
}

export interface LoginInfo {
  email: string | undefined;
  password: string | undefined;
  isAdmin: boolean;
}

export const SignupApi = async (signupInfo: SignupInfo)=> {
  try {
    await axiosInstance.post('/user/signup', signupInfo);
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

export const LoginApi = async (loginInfo: LoginInfo) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post('/user/login', loginInfo);
    const refreshToken = response.headers['refresh-token'];
    // Cookies.set("refreshToken", refreshToken)
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
}