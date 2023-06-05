import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data?: MypageProfileResponse;
}

export type MypageProfileResponse = {
  userImageUrl: string;
  username: string;
  alcolhol: number;
  socialName: string;
  meetedUser: MeetUser[];
  blacklistedUser: BlacklistedUser[];
  followingUser: FollowingUser[];
};

export interface MeetUser {
  metUser: string;
  createdAt: string;
}

export interface BlacklistedUser {
  blacklistedUser: string;
}

export interface FollowingUser {
  followingUser: string;
}

export const getMypageProfile = async (): Promise<
  MypageProfileResponse | undefined
> => {
  try {
    const response: AxiosResponse<MypageProfileResponse> =
      await axiosInstance.get('/mypage');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
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
