'use client';

import { AppSidebar } from '@/components/ui/appSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

interface ConfigLayoutUserProps {
  children: React.ReactNode;
}

const ConfigLayoutUser: React.FC<ConfigLayoutUserProps> = ({ children }) => {
  const pathname = usePathname();

  const handleChangeHeaderPage = () => {
    if (pathname === '/dashboard') return 'Absensi';
    if (pathname === '/dashboard/pengajuan') return 'Pengajuan';
    if (pathname === '/dashboard/projects') return 'Projects';
    if (pathname === '/dashboard/stock-gudang') return 'Stock Gudang';
    if (pathname === '/dashboard/settings') return 'Settings';
  };

  return (
    <>
      <AppSidebar />
      <div className="w-full h-full min-h-screen bg-neutral-800 text-neutral-300">
        <div className="flex justify-between pl-2 pr-10 pt-2 items-center">
          <SidebarTrigger variant="default" />
          <h1 className="text-2xl font-semibold text-neutral-100">
            {handleChangeHeaderPage()}
          </h1>
        </div>
        <div className='p-3 px-4 flex items-center justify-center h-full lg:min-h-[630px] 3xl'>{children}</div>
      </div>
    </>
  );
};

export default ConfigLayoutUser;
