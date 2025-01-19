"use client"

import './globals.css';
import ToastComp from '@/components/toasts';
import StoreProvider from '@/providers/storeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
