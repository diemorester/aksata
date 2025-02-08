import { Inter } from 'next/font/google';
import ClientQueryProvider from '@/components/ClientQueryProvider';
import './globals.css';
import ToastComp from '@/components/toasts';
import StoreProvider from '@/providers/storeProvider';
import { SidebarProvider, } from '@/components/ui/sidebar';

// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className}`}> */}
      <body>
        <StoreProvider>
          <SidebarProvider>
            <ToastComp />
            <ClientQueryProvider>{children}</ClientQueryProvider>
          </SidebarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}