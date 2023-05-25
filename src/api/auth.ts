import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
}

export interface SignupInfo {
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  birthday: string | undefined;
  gender: string | undefined;
  admin: boolean;
  adminkey: string | undefined;
}

export interface LoginInfo {
  email: string
  password: string
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