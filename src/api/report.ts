import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface ApiResponse {
  status: number;
  message: string;
}

export type Report = {
  reportKind: string | undefined;
  another: string | null;
};

export const ReportApi = async (
  userId: string | undefined,
  reportData: Report
): Promise<ApiResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
      `/report/${userId}`,
      reportData
    );
    return response.data;
  } catch (error) {
    throw error as Error;
  }
};
