import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: MypageProfileResponse;
}

export type MypageProfileResponse = {
  image: string;
  nickname: string;
};

export const getMypageProfile = async (): Promise<
  MypageProfileResponse | undefined
> => {
  try {
    const response: AxiosResponse<MypageProfileResponse> =
      await axiosInstance.get(`/user/mypage`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};

export const updateMypageProfile = async (
  image: FormData
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.put(
      `/user/mypage`,
      image,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};
