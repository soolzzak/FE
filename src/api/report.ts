import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  msg: string;
}

export type Report = {
  reportKind: string | undefined;
  another: string | null;
};

export const reportApi = async (userId: string, reportData: Report): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
      `/report/${userId}`,reportData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
  }
};
