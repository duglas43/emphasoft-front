import axios from "axios";
import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const useBearerHeader = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
};
// const useRefreshToken = async (error: any) => {
//   const originalRequest = error.config;
//   if (error.response.status === 401 && error.config && !error.config._isRetry) {
//     originalRequest._isRetry = true;
//     try {
//       const response = await axiosInstance.post(
//         `${process.env.REACT_APP_API_URL}/auth/refresh`,
//         {
//           withCredentials: true,
//         }
//       );
//       window.localStorage.setItem("token", response.data.access_token);
//       return axiosInstance.request(originalRequest);
//     } catch (error) {}
//   }
//   throw error;
// };

axiosInstance.interceptors.request.use((config) => useBearerHeader(config));
// axiosInstance.interceptors.response.use(undefined, (error) =>
//   useRefreshToken(error)
// );

export const axiosBaseQuery =
  ({
    baseQuery,
  }: {
    baseQuery: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, ...other }) => {
    try {
      const result = await axiosInstance({
        url: baseQuery + url,
        method,
        data,
        params,
        ...other,
      });
      return { ...result, meta: result };
    } catch (axiosError) {
      let err = axiosError as AxiosError<{
        message: string;
        messageT?: string;
        errors: string[];
      }>;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message,
          messageT: err.response?.data?.messageT,
          errors: err.response?.data?.errors,
        },
      };
    }
  };
