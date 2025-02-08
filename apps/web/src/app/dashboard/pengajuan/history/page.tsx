"use client"

import Link from "next/link"
import ListApproval from "../../components/ListApproval"
import { FaArrowLeftLong } from "react-icons/fa6"

const UserHistory = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-3 pb-2">
        <Link
          href="/dashboard"
          className='flex items-center gap-2 cursor-pointer'
        >
          <FaArrowLeftLong className='text-neutral-300 hover:text-off-white' />
          <p className='text-neutral-300 hover:text-off-white'>kembali</p>
        </Link>
        <p className="text-2xl text-off-white font-semibold">History Pengajuan</p>
      </div>
      <ListApproval />
    </div>
  )
}

export default UserHistory