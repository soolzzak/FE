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

export const getRoom = async (
  params: string
): Promise<ApiResponse | undefined> => {
  try {
    const token = Cookies.get('accessKey');
    const headers = { ACCESS_KEY: `${token}` };

    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/room/${params}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};
