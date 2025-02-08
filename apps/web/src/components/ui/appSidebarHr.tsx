'use client';

import useRouterHR from '@/app/dashboardHR/hooks/useRoutersHR';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';
import Avatar from '../Avatar';
import { useAppSelector } from '@/redux/hooks';
import ModalLogout from '../ModalLogout';
import Image from 'next/image';
import Link from 'next/link';

const AppSidebarHr = () => {
  const { handleToggleModal, isOpen, router } = useRouterHR();
  const { name, avatar } = useAppSelector((user) => user.user);

  const pengajuanMenu = router.slice(0, 2);
  const dataKaryawanMenu = router.slice(2, 4);
  const utilityMenu = router.slice(4, 6);

  return (
    <Sidebar collapsible="icon" color="white">
      <SidebarHeader
        colorTextWhenOpen="black"
        textWhenOpen="Aksata"
        className="flex flex-row justify-start md:gap-4 text-black"
      >
        <Image
          src="/aksata-logo.png"
          width={350}
          height={350}
          alt="company-icon"
          className="w-12 h-10"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent className="mt-4">
          <SidebarMenu>
            <SidebarGroupLabel className="text-black">
              Pengajuan Karyawan
            </SidebarGroupLabel>
            {pengajuanMenu.map((pengajuan) => {
              return (
                <SidebarMenuItem
                  key={pengajuan.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    variant="aksata"
                    asChild
                    isActive={pengajuan.active}
                    className="text-black/70"
                  >
                    <Link href={pengajuan.href}>
                      <pengajuan.icon />
                      <span>{pengajuan.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarMenu className="mt-6">
            <SidebarGroupLabel className="text-black">
              Data Karyawan
            </SidebarGroupLabel>
            {dataKaryawanMenu.map((karyawan) => {
              return (
                <SidebarMenuItem
                  key={karyawan.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    variant="aksata"
                    asChild
                    isActive={karyawan.active}
                    className="text-black/70"
                  >
                    <Link href={karyawan.href}>
                      <karyawan.icon />
                      <span>{karyawan.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarMenu className="mt-6">
            <SidebarGroupLabel className="text-black">
              Utility
            </SidebarGroupLabel>
            {utilityMenu.map((util) => {
              return (
                <SidebarMenuItem
                  key={util.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    variant="aksata"
                    asChild
                    onClick={util.onClick}
                    isActive={util.active}
                    className="text-black/70"
                  >
                    <Link href={util.href}>
                      <util.icon />
                      <span>{util.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="text-black" username={name}>
        <Avatar image={avatar} />
      </SidebarFooter>
      <ModalLogout type="aksata" isOpen={isOpen} onClose={handleToggleModal} />
    </Sidebar>
  );
};

export default AppSidebarHr;
