import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: Room[];
}

export type Room = {
  roomId: number;
  hostId: number;
  title: string;
  username: string;
  category: string;
  genderSettings: string;
  isPrivate: boolean;
  roomPassword: string;
  createdAt: string;
  alcohol: number;
  userImage: string;
  roomImage: string;
};

export const getRoom = async (
  params: string
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/room/${params}`
    );
    console.log('getroom data api ', response);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    }
  }
};
