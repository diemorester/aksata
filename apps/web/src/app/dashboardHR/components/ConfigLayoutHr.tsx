'use client';

import AppSidebarHr from '@/components/ui/appSidebarHr';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

interface ConfigLayoutHrProps {
  children: React.ReactNode;
}

const ConfigLayoutHr: React.FC<ConfigLayoutHrProps> = ({ children }) => {
  const pathname = usePathname();

  const handleChangeHeaderPage = () => {
    if (pathname === '/dashboardHR') return 'Pengajuan Absensi';
    if (pathname === '/dashboardHR/lembur-perdin') return 'Pengajuan Lembur & Perdin';
    if (pathname === '/dashboardHR/data-absensi') return 'Data Absensi';
    if (pathname === '/dashboardHR/data-lembur-perdin') return 'Data Lembur & Perdin';
    if (pathname === '/dashboardHR/settings') return 'Settings';
  };


  return (
    <>
      <AppSidebarHr />
      <div className="w-full h-full min-h-screen text-black bg-broken-white">
        <div className="flex justify-between pl-2 pr-10 pt-2 items-center">
          <SidebarTrigger variant="default" className='text-black'/>
          <h1 className="text-2xl font-semibold text-black">{handleChangeHeaderPage()}</h1>
        </div>
        <div className="p-3 px-4 flex w-full h-full lg:min-h-[630px] 3xl">
          {children}
        </div>
      </div>
    </>
  );
};

export default ConfigLayoutHr;
