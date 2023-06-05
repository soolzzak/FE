import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data: MainpageRooms[];
}
interface ApiResponse1 {
  status: number;
  msg: string;
  data: MainpageRooms;
}

export type MainpageRooms = {
  roomId: number;
  hostId: number;
  title: string;
  username: string;
  category: string;
  genderSetting: string;
  isPrivate: boolean;
  roomPassword: string | null;
  createdAt: string;
  alcohol: number;
  mypageImageUrl: string | null;
  roomImageUrl: string | undefined;
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

export type CreateRoomData = {
  data: {
    title: string;
    category: string;
    genderSetting: string;
    isPrivate: boolean;
    roomPassword: string | null;
  };
  image: File | null;
};
export const createRoom = async ({
  data,
  image,
}: CreateRoomData): Promise<ApiResponse1> => {
  try {
    const formData = new FormData();
    const sentData = JSON.stringify({ ...data });
    const textBlob = new Blob([sentData], { type: 'application/json' });

    formData.append('roomRequestDto', textBlob);
    if (image) formData.append('roomImage', image);

    const token = Cookies.get('accessKey');
    const headers = { ACCESS_KEY: `${token}` };
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.post(
      '/room',
      formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
