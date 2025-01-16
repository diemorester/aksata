"use client"

import axiosInstance from '@/libs/axios';
import { createCookie } from '@/libs/server';
import { useEffect } from 'react';

const useAutoRefreshToken = () => {
  useEffect(() => {
    const refreshInterval = setInterval(
      async () => {
        try {
          const response = await axiosInstance.post('/user/refresh-token');
          const newAccessToken = response.data.accessToken;
          console.log(newAccessToken, "TOKEN BARU NICHHH");
          
          createCookie('access_token', newAccessToken);
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      },
      13 * 60 * 1000,
    );

    return () => clearInterval(refreshInterval); 
  }, []);
};

export default useAutoRefreshToken;
