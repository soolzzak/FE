import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
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
    )
    const accessKey = response.headers.access_key;
    const refreshKey = response.headers.refresh_key;
    if (accessKey && refreshKey) {
      Cookies.set("accessKey", accessKey);
      Cookies.set("refreshKey", refreshKey);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

export const getAccessKey = () => Cookies.get("accessKey");
export const getRefreshKey = () => Cookies.get("refreshKey");