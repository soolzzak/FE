import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: MainpageRoom[];
}

interface MainpageRoom {
  roomId: number;
  title: string;
  username: string;
  category: string;
}

export const getMainpageRooms = async (): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/main`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};
