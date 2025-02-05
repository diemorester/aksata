import { Inter } from 'next/font/google';
import ClientQueryProvider from '@/components/ClientQueryProvider';
import './globals.css';
import ToastComp from '@/components/toasts';
import StoreProvider from '@/providers/storeProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastComp />
        <StoreProvider>
          <ClientQueryProvider>{children}</ClientQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
