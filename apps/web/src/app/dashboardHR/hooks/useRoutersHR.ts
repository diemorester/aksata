'use client'
import { useAppDispatch } from "@/redux/hooks";
import { setIsModalOpen } from "@/redux/slices/modalSlice";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { FaCodePullRequest } from "react-icons/fa6";

const useRouterHR = () => {
    const dispatch = useAppDispatch();
    const pathName = usePathname();
    const handleClick = useCallback(() => {
        dispatch(setIsModalOpen(true))
    }, [dispatch])
    const router = useMemo(() => [
        {
            label: "Requests",
            href: "/dashboardHR",
            icon: FaCodePullRequest,
            active: pathName == "/dashboardHR"
        },
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
    ], [pathName, handleClick])
    return router
}

export default useRouterHR