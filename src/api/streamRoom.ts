import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: Room[];
}

export type Room = {
  roomId: number;
  userId: number;
  title: string;
  username: string;
  category: string;
  genderSettings: string;
  isPrivate: boolean;
  roomPassword: string;
  createdAt: string;
  alcohol: number;
  imgurl: string;
  imageUrl: string;
};

export const getRoom = async (): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/room/:id`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};
