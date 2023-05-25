import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: MainpageRooms[];
}

export type MainpageRooms = {
  roomId: number;
  userId: number;
  title: string;
  username: string;
  category: string;
  genderSetting: string;
  isPrivate: boolean;
  roomPassword: string | null;
  createdAt: string;
  alcohol: number;
  mypageImageUrl: null;
  roomImageUrl: string;
};

export const getMainpageRooms = async (): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      '/main'
    );

    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
