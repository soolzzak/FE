import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data: MypageProfileRooms;
}

export interface MypageProfileRooms {
  userImageUrl: string | undefined;
  username: string;
  alcohol: number;
  socialProvider: string;
  email: string;
  metUser: TabUserList[];
  blacklistedUser: TabUserList[];
  followingUser: TabUserList[];
}

export interface TabUserList {
  userId: string;
  username: string;
  image: string;
  createdAt: string;
}

export const getMypageProfile = async (): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      '/mypage'
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

export const updateMypageProfile = async (
  file: FormData
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.put(
      '/mypage',
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
