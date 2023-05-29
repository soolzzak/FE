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
  birthday: Date | undefined;
  gender: string | undefined;
  admin: boolean;
  adminkey: string | null;
}

export interface LoginInfo {
  email: string
  password: string
}

export const SignupApi = async (signupInfo: SignupInfo)=> {
  try {
    await axiosInstance.post('/user/signup', signupInfo);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) throw error;
  }
};

export const LoginApi = async (loginInfo: LoginInfo) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post('/user/login', loginInfo);
    const accessToken = response.headers['access-token'];
    // Cookies.set("refreshToken", refreshToken)
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
}