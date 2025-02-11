'use client';

import axiosInstance from '@/libs/axios';
import { getCookie } from '@/libs/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGeolocation } from './useGeolocation ';
import { useState } from 'react';

const usePostClockIn = () => {
  const { location: locationCoordinat } = useGeolocation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = await getCookie('access_token');

      const { data: locationData } = await axiosInstance.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${locationCoordinat?.latitude}&lon=${locationCoordinat?.longitude}&format=json`,
      );

      const location = locationData.display_name

      const { data } = await axiosInstance.post(
        '/absensi/clock-in',
        {
          longitude: locationCoordinat?.longitude,
          latitude: locationCoordinat?.latitude,
          location: location, 
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pie-chart'] });
    },
  });
};

export default usePostClockIn;
