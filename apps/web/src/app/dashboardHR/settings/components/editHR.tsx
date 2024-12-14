'use client'
import { useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ChangePasswordModalHR from "./changePasswordHRModal";

const EditHR = () => {
    const { name, email } = useAppSelector(state => state.user);
    const [isModalPasswordHR, setIsModalPasswordHR] = useState(false);

    return (
        <div className="w-full h-full flex flex-col justify-evenly px-8 text-black rounded-lg">
            <div className="flex justify-between">
                <div>
                    <p className="block text-neutral-800 font-semibold">NAME</p>
                    <p className="px-1 rounded-lg text-sm">{name}</p>
                </div>
                <button className="text-sm px-4 py-1 rounded-lg cursor-not-allowed bg-[#C7CACD] hover:bg-neutral-300">
                    <div className="flex space-x-2 items-center">
                        <AiOutlineEdit className="text-[#f0f4f8]" />
                        <p className="text-[#f0f4f8] text-xs">
                            EDIT
                        </p>
                    </div>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="block text-neutral-800 font-semibold">EMAIL</p>
                    <p className="px-1 rounded-lg text-sm">{email}</p>
                </div>
                <button className="text-sm px-4 py-1 rounded-lg cursor-not-allowed bg-[#C7CACD] hover:bg-neutral-300">
                    <div className="flex space-x-2 items-center">
                        <AiOutlineEdit className="text-[#f0f4f8]" />
                        <p className="text-[#f0f4f8] text-xs">
                            EDIT
                        </p>
                    </div>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="block text-neutral-800 font-semibold">PHONE</p>
                    <p className="px-1 rounded-lg text-sm">-</p>
                </div>
                <button className="text-sm px-4 py-1 rounded-lg cursor-not-allowed bg-[#C7CACD] hover:bg-neutral-300">
                    <div className="flex space-x-2 items-center">
                        <AiOutlineEdit className="text-[#f0f4f8]" />
                        <p className="text-[#f0f4f8] text-xs">
                            EDIT
                        </p>
                    </div>
                </button>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="px-5 py-3 transition-all duration-200 bg-black rounded-lg text-[#f0f4f8] hover:bg-neutral-700 active:scale-95"
                    onClick={() => setIsModalPasswordHR(true)}
                >
                    Reset Password
                </button>
            </div>
            <ChangePasswordModalHR isOpen={isModalPasswordHR} onClose={() => setIsModalPasswordHR(false)} />
        </div>
    )
}

export default EditHR