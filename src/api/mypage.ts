import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data: MypageProfileRooms;
}

export interface MypageProfileRooms {
  userImage: string | undefined;
  username: string;
  alcohol: number;
  kakaoId: string | null;
  email: string;
  metUser: TabUserList[];
  blockListedUser: TabUserList[];
  followingUser: TabUserList[];
}

export interface TabUserList {
  userId: string;
  username: string;
  userImage: string;
  createdAt: string;
}

export const getMypageProfile = async (): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
      '/mypage'
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

// 마이페이지 수정
export interface UpdateMypageData {
  userImage: File | null;
  username: string;
}

export const updateMypageProfile = async ({
  userImage,
  username,
}: UpdateMypageData) => {
  try {
    const formData = new FormData();
    // console.log(userImage);
    if (userImage) formData.append('userImage', userImage);
    formData.append('username', username);

    const response = await axiosInstance.put('/mypage', formData);
    return response;
  } catch (error) {
    throw error as Error;
  }
};

// 상대유저상세조회
interface ApiResponse1 {
  status: number;
  msg: string;
  data: DetailUserProfile;
}

export interface DetailUserProfile {
  userId: string;
  userImage: string | undefined;
  username: string;
  email: string;
  alcohol: number;
  alcoholUp: boolean;
  alcoholDown: boolean;
  follow: boolean;
  block: boolean;
}

export const getDetailUserProfile = async (
  userId: string
): Promise<ApiResponse1 | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.get(
      `/mypage/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};

// 팔로잉
interface ApiResponse1 {
  status: number;
  message: string;
}

export const FollowHandler = async (
  followId: string | undefined
): Promise<ApiResponse1> => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
      `/follow/${followId}`
    );
    return response.data as ApiResponse1; // PUT 요청의 응답 데이터 처리
  } catch (error) {
    throw error as Error;
  }
};

// 도수올리기
export const ThumbUpHandler = async (
  targetId: string | undefined
): Promise<ApiResponse1> => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
      `/alcohol/like/${targetId}`
    );
    // console.log(response.data); // PUT 요청의 응답 데이터 처리
    return response.data as ApiResponse1; // PUT 요청의 응답 데이터 처리
  } catch (error) {
    throw error as Error;
  }
};

// 도수내리기
export const ThumbDownHandler = async (
  targetId: string | undefined
): Promise<ApiResponse1> => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
      `/alcohol/dislike/${targetId}`
    );
    return response.data as ApiResponse1; // PUT 요청의 응답 데이터 처리
  } catch (error) {
    throw error as Error;
  }
};

// 차단하기
export const BlockHandler = async (
  targetId: string | undefined
): Promise<ApiResponse1> => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
      `/blockList/${targetId}`
    );
    return response.data as ApiResponse1; // PUT 요청의 응답 데이터 처리
  } catch (error) {
    throw error as Error;
  }
};
