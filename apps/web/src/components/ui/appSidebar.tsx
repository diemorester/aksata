"use client"

import { Sidebar, SidebarContent, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import useRouter from "@/hooks/useRouters"
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
    const { router, isOpen, handleToggleModal } = useRouter();

    const generalMenu = router.slice(0, 3);
    const utilMenu = router.slice(4, 5);

    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader textWhenOpen="Ristoan Tri Laras" className="flex flex-row justify-start md:gap-4">
                <Image 
                    src="/company-logo.png"
                    width={350}
                    height={350}
                    alt="company-icon"
                    className="w-12 h-10"
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {generalMenu.map((general) => {
                            return (
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={general.href}
                                        >
                                            <general.icon />
                                            <span>
                                                {general.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
        </Sidebar>
    )
}