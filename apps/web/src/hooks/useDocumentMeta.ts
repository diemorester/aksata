"use client"

import { useEffect } from 'react';

const useDocumentMeta = () => {
  useEffect(() => {
    document.title = 'ERP Aksata';

    const favicon = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = '/favicon.ico?v=4';
    }
  }, []);
};

export default useDocumentMeta;
