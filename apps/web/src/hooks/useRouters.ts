'use client'
import { useAppDispatch } from "@/redux/hooks"
import { setIsModalOpen } from "@/redux/slices/modalSlice"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { LuUpload } from "react-icons/lu"
import { RiCalendarCheckLine } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
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
            label: "Projects",
            href:"/dashboard/projects",
            icon: FaProjectDiagram,
            active: pathName == "/dashboard/projects" 
        },
        {
            label: "Stock Gudang",
            href: "/dashboard/stock-gudang",
            icon: MdWarehouse,
            active: pathName == "/dashboard/stock-gudang"
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: IoMdSettings,
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