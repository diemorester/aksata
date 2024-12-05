"use client"
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditNameModal from "./editNameModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EditUserSlice } from "@/types/userTypes";
import { editUserFetch } from "@/libs/fetch/auth";
import toast from "react-hot-toast";
import { loginAction } from "@/redux/slices/userslice";
import { AxiosError } from "axios";
import EditPhoneModal from "./editPhoneModal";

const UserSettings = () => {
    const { name, email, phone } = useAppSelector(user => user.user)
    const [isLoading, setIsLoading] = useState(false);
    const [isModalName, setIsModalName] = useState(false);
    const [isModalEmail, setIsModalEmail] = useState(false);
    const [isModalPhone, setIsModalPhone] = useState(false);
    const [isModalRemove, setIsModalRemove] = useState(false);
    const [isModalPassword, setIsModalPassword] = useState(false);
    const dispatch = useAppDispatch()

    const handleUpdate = async (data: EditUserSlice) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            if (data.name) {
                formData.append('name', data.name)
            }
            if (data.phone) {
                formData.append('phone', data.phone)
            }
            if (data.avatar) {
                formData.append('avatar', data.avatar)
            }

            const res = await editUserFetch(formData)
            dispatch(loginAction(res.data.user.updatedUser))
            toast.success(res.data.msg)
            setIsModalName(false)
            setIsModalPhone(false)

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-evenly px-8 text-white rounded-lg shadow-md">
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-400">
                        NAME
                    </label>
                    <p className="px-1 rounded-lg">{name}</p>
                </div>
                <button onClick={() => setIsModalName(true)} className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                    <AiOutlineEdit />
                    <p
                        className="text-neutral-100 text-sm">
                        EDIT
                    </p>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        EMAIL
                    </label>
                    <p className="px-1 rounded-lg">{email}</p>
                </div>
                <button className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                    <AiOutlineEdit />
                    <p
                        className="text-neutral-100 text-sm ">
                        EDIT
                    </p>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        PHONE
                    </label>
                    <p className="px-1 rounded-lg">{`+62 ${phone}` || '-'}</p>
                </div>
                <div className="flex items-center space-x-6">
                    <button className="bg-transparent relative group text-white active:scale-95">
                        remove
                        <span className="absolute bottom-1 left-1/2 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </button>
                    <button onClick={() => setIsModalPhone(true)} className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                        <AiOutlineEdit />
                        <p
                            className="text-neutral-100 text-sm ">
                            EDIT
                        </p>
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-neutral-300 rounded-3xl w-fit justify-end active:scale-95 px-5 text-black py-3">
                    Reset Password
                </button>
            </div>
            <EditNameModal isOpen={isModalName} onClose={() => setIsModalName(false)} isLoading={isLoading} handleUpdate={handleUpdate} />
            <EditPhoneModal isOpen={isModalPhone} onClose={() => setIsModalPhone(false)} isLoading={isLoading} handleUpdate={handleUpdate} />
        </div>
    );
};

export default UserSettings;