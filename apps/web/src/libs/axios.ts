import axios from 'axios';
import { createCookie } from './server';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response, // Return jika sukses
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mencegah loop refresh token

      try {
        // Panggil endpoint refresh token
        const refreshResponse = await axiosInstance.post('/user/refresh-token');
        const newAccessToken = refreshResponse.data.accessToken;
        
        console.log(newAccessToken, "AXIOS TOKEN");
        

        // Simpan access token baru di localStorage
        // localStorage.setItem('accessToken', newAccessToken);
        createCookie("access_token", newAccessToken)

        // Set header Authorization untuk request ulang
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Kirim ulang request yang gagal
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle jika refresh token gagal
        console.error('Refresh token failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
