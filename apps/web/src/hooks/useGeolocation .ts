'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error(
        'lokasi belum tersedia untuk browser ini, coba gunakan browser lain',
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
        console.log('ERROR HOOKS GEOLOCATION', err);
      },
    );
  }, []);

  return { location, error };
};
