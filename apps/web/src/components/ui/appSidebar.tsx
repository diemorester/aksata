'use client';

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
} from '@/components/ui/sidebar';
import useRouter from '@/hooks/useRouters';
import Image from 'next/image';
import Link from 'next/link';
import ModalLogout from '../ModalLogout';
import Avatar from '../Avatar';
import { useAppSelector } from '@/redux/hooks';

export function AppSidebar() {
  const { router, isOpen, handleToggleModal } = useRouter();
  const { name, avatar } = useAppSelector((user) => user.user);

  const generalMenu = router.slice(0, 2);
  const officeMenu = router.slice(2, 4);
  const utilMenu = router.slice(4, 6);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        textWhenOpen="Ristoan Tri Laras"
        className="flex flex-row justify-start md:gap-4"
      >
        <Image
          src="/company-logo.png"
          width={350}
          height={350}
          alt="company-icon"
          className="w-12 h-10"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent className="mt-4">
          <SidebarMenu>
            <SidebarGroupLabel>Personal</SidebarGroupLabel>
            {generalMenu.map((general) => {
              return (
                <SidebarMenuItem
                  key={general.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={general.active}
                    className="text-off-white/70"
                  >
                    <Link href={general.href}>
                      <general.icon />
                      <span>{general.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarMenu className="mt-6">
            <SidebarGroupLabel>Office</SidebarGroupLabel>
            {officeMenu.map((office) => {
              return (
                <SidebarMenuItem
                  key={office.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={office.active}
                    className="text-off-white/70"
                  >
                    <Link href={office.href}>
                      <office.icon />
                      <span>{office.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarMenu className="mt-6">
            <SidebarGroupLabel>Utility</SidebarGroupLabel>
            {utilMenu.map((office) => {
              return (
                <SidebarMenuItem
                  key={office.href}
                  className="flex items-center justify-center w-full"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={office.active}
                    onClick={office.onClick}
                    className="text-off-white/70"
                  >
                    <Link href={office.href}>
                      <office.icon />
                      <span>{office.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter username={name}>
        <Avatar image={avatar} />
      </SidebarFooter>
      <ModalLogout isOpen={isOpen} onClose={handleToggleModal} />
    </Sidebar>
  );
}
