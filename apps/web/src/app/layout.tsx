"use client"

import { Inter } from 'next/font/google';
import './globals.css';
import ToastComp from '@/components/toasts';
import StoreProvider from '@/providers/storeProvider';
import useAutoRefreshToken from '@/hooks/useAutoRefreshToken';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoRefreshToken();

  useEffect(() => {
    document.title = "ERP Aksata";

    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = '/favicon.ico?v=4';
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastComp />
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}