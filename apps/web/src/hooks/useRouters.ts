import { useAppDispatch } from "@/redux/hooks"
import { setIsModalOpen } from "@/redux/slices/modalSlice"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { LuUpload } from "react-icons/lu"
import { RiCalendarCheckLine } from "react-icons/ri"
import { IoIosSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc"

const useRouter = () => {
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const handleClick = () => {dispatch(setIsModalOpen(true))}
    const router = useMemo(() => [
        {
            label: "Absensi",
            href: "/dashboard",
            icon: RiCalendarCheckLine,
            active: pathName == "/dashboard"
        },
        {
            label: "Pengajuan",
            href: "/dashboard/pengajuan",
            icon: LuUpload,
            active: pathName == "/dashboard/pengajuan"
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: IoIosSettings,
            active: pathName == "/dashboard/settings"
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

export default useRouter