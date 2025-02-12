'use client'

import { usePathname } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { FaProjectDiagram } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { LuUpload } from "react-icons/lu"
import { MdWarehouse } from "react-icons/md"
import { RiCalendarCheckLine } from "react-icons/ri"
import { VscSignOut } from "react-icons/vsc"

const useRouter = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleModal = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen])
    
    const router = useMemo(() => [
        {
            label: "Absensi",
            href: "/dashboard",
            icon: RiCalendarCheckLine,
            active: pathName.startsWith("/dashboard/absensi-history") || 
                    pathName.startsWith("/dashboard/clock-in-history") || 
                    pathName === "/dashboard"
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
            onClick: handleToggleModal
        }
    ], [pathName, handleToggleModal])
    return { router, isOpen, handleToggleModal }
}

export default useRouter