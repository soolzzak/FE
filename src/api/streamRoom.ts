import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './axios';
import { ApiResponse1, CreateRoomData } from './main';
import { handleImageCompression } from '../utils/compressImage';

interface ApiResponse {
  status?: number;
  message: string;
  data?: Room[];
  response?: { data: { message: string } };
}

export type Room = {
  roomId: number;
  hostId: number;
  title: string;
  username: string;
  category: string;
  genderSetting: string;
  isPrivate: boolean;
  roomPassword: string;
  createdAt: string;
  alcohol: number;
  userImage: string;
  roomImageUrl: string;
};

export const getRoom = async (roomId: string) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/room/${roomId}`
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

export const checkIfRoomIsEmpty = async (
  params: string
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/room/${params}/check`
    );
    console.log('check if room is empty ', response.data);
    return response.data;
  } catch (error) {
    return error as Error;
  }
};

export const modifyRoom = async ({
  data,
  image,
  roomId,
  }: CreateRoomData & { roomId: string }): Promise<ApiResponse1> => {
  try {
  const formData = new FormData();
  const sentData = JSON.stringify({ ...data });
  const textBlob = new Blob([sentData], { type: 'application/json' });
  
  formData.append('roomRequestDto', textBlob);
  
  if (image) {
  const compressedImage = await handleImageCompression(image);
  formData.append('roomImage', image);
  }
  
  const token = Cookies.get('accessKey');
  const headers = { ACCESS_KEY: `${token}` };
  const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
  `/room/${roomId}`,
  formData,
  { headers }
  );
  return response.data;
  } catch (error) {
  throw error as Error;
  }
  };

  export const checkRoomPassword = async (roomId: string, roomPassword: string | null) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
        `/room/passwordCheck/${roomId}?roomPassword=${roomPassword}`
      );
      return response.data;
    } catch (error) {
      throw error as Error;
    }
  };