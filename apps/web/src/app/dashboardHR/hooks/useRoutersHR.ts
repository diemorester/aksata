'use client'
import { useAppDispatch } from "@/redux/hooks";
import { setIsModalOpen } from "@/redux/slices/modalSlice";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";

const useRouterHR = () => {
    const dispatch = useAppDispatch();
    const pathName = usePathname();
    const handleClick = () => {dispatch(setIsModalOpen(true))};
    const router = useMemo(() => [
        {
            label: "Dashboard",
            href: "/dashboardHR",
            icon: BiSolidDashboard,
            active: pathName == "/dashboardHR"
        },
        {
            label: "Settings",
            href: "/dashboardHR/settings",
            icon: IoMdSettings,
            active: pathName == "/dashboardHR/settings"
        },
        {
            label: "Logout",
            href: "#",
            icon: VscSignOut,
            onClick: handleClick
        }
    ], [pathName])
    return router
}

export default useRouterHR