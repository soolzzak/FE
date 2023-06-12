import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './axios';
import { handleImageCompression } from '../utils/compressImage';

interface ApiResponse {
  status: number;
  msg: string;
  data: PageableContent;
}
export interface PageableContent {
  number: number;
  totalPages: number;
  content: MainpageRooms[];
}
interface ApiResponse1 {
  status: number;
  msg: string;
  data: MainpageRooms;
}
export type MainpageRooms = {
  roomCapacity: number;
  userList: object;
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
  userImage: string | undefined;
  roomImageUrl: string | undefined;
};

export const getMainpageRooms = async (
  url: string
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
export const getFilteredData = async (
  genderOption: string,
  isFull: boolean
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/rooms/setting?genderSetting=${genderOption}&roomCapacityCheck=${isFull}`
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
export const getSearchData = async (
  searchword: string
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/search?title=${searchword}`
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

export const getByCategory = async (
  category: string
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      `/rooms/${category}`
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

    if (image) {
      const compressedImage = await handleImageCompression(image);
      formData.append('roomImage', image);
    }

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
