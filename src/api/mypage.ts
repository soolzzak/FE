import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
  data: MypageProfileRooms;
}

interface MessageApiResponse {
  status: number;
  msg: string;
  data: MessageData;
}

export interface MessageData {
  messageId: number;
  content: string;
  isRead: boolean;
  senderUsername: string;
  receiverUsername: string;
  createdAt: Date;
}

export interface MypageProfileRooms {
  userImage: string | undefined;
  username: string;
  alcohol: number;
  kakaoId: string | null;
  introduction: string;
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
// export interface UpdateMypageData {
//   userImage: File | null;
//   username: string;
// }

// export const updateMypageProfile = async ({
//   userImage,
//   username,
// }: UpdateMypageData) => {
//   try {
//     const formData = new FormData();

//     if (userImage) formData.append('userImage', userImage);
//     formData.append('username', username);

//     const response = await axiosInstance.put('/mypage', formData);
//     return response;
//   } catch (error) {
//     throw error as Error;
//   }
// };

export interface UpdateMypageData {
  userImage: File | null;
  username: string;
  introduction: string | null;
}

export const updateMypageProfile = async ({
  userImage,
  username,
  introduction,
}: UpdateMypageData) => {
  try {
    const formData = new FormData();

    if (userImage) formData.append('userImage', userImage);
    if (username) formData.append('username', username);
    if (introduction) formData.append('introduction', introduction);

    const response: AxiosResponse<ApiResponse1> = await axiosInstance.put(
      '/mypage',
      formData
    );
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

interface ApiResponse2 {
  status: number;
  msg: string;
  data: FindUserName[];
}

export interface FindUserName {
  alcohol: number;
  alcoholDown: boolean;
  alcoholUp: boolean;
  blockedByCurrentUser: boolean;
  followedByCurrentUser: boolean;
  introduction: string;
  userId: string;
  userImage: string;
  username: string;
}

export interface DetailUserProfile {
  userId: string;
  userImage: string | undefined;
  username: string;
  introduction: string;
  email: string;
  alcohol: number;
  alcoholUp: boolean;
  alcoholDown: boolean;
  follow: boolean;
  block: boolean;
}

interface Message {
  receiverUsername: string;
  content: string;
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

// 쪽지 보내기
export const sendMessage = async (message: Message) => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.post(
      '/message/send',
      message
    );
    return response;
  } catch (error: any) {
    throw error as Error;
  }
};

// 쪽지 받기
export const receivedMessage = async (params: string) => {
  try {
    const response: AxiosResponse<MessageApiResponse> = await axiosInstance.get(
      `/message/${params}`
    );
    return response;
  } catch (error: any) {
    throw error as Error;
  }
};

// 보낸쪽지
export const sentMessage = async () => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.get(
      '/message/sent'
    );
    return response;
  } catch (error: any) {
    throw error as Error;
  }
};

// 받은쪽지 읽기
export const readMessage = async (messageId: string) => {
  try {
    const response: AxiosResponse<ApiResponse1> = await axiosInstance.get(
      `/message/read/${messageId}`
    );
    return response;
  } catch (error: any) {
    throw error as Error;
  }
};
// 유저찾기
export const FindUser = async (
  username: string
): Promise<ApiResponse2 | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse2> = await axiosInstance.get(
      `/mypage/search?username=${username}`
    );
    return response.data as ApiResponse2; // PUT 요청의 응답 데이터 처리
  } catch (error) {
    throw error as Error;
  }
};
