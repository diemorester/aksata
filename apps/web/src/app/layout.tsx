"use client"

// import { Inter } from 'next/font/google';
import './globals.css';
import ToastComp from '@/components/toasts';
import StoreProvider from '@/providers/storeProvider';
import useAutoRefreshToken from '@/hooks/useAutoRefreshToken';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDocumentMeta from '@/hooks/useDocumentMeta';

// const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoRefreshToken();
  useDocumentMeta();

  return (
    <html lang="en">
      <body>
        <ToastComp />
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
