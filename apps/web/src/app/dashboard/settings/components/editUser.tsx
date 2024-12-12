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
import ButtonSpan from "@/components/buttons/spanButtons";
import RemovePhoneModal from "./removePhoneModal";
import ChangePasswordModal from "./changePasswordModal";
import ChangeEmailModal from "./changeEmailModal";

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
                    <p className="px-1 rounded-lg text-sm">{name}</p>
                </div>
                <ButtonSpan
                    type="button"
                    fill="bg-neutral-700"
                    onClick={() => setIsModalName(true)}
                >
                    <div className="flex space-x-2 items-center">
                        <AiOutlineEdit className="text-neutral-100" />
                        <p className="text-neutral-100 text-xs">
                            EDIT
                        </p>
                    </div>
                </ButtonSpan>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        EMAIL
                    </label>
                    <p className="px-1 rounded-lg text-sm">{email}</p>
                </div>
                <ButtonSpan
                    type="button"
                    fill="bg-neutral-700"
                    onClick={() => setIsModalEmail(true)}
                >
                    <div className="flex space-x-2 items-center">
                        <AiOutlineEdit className="text-neutral-100" />
                        <p className="text-neutral-100 text-xs">
                            EDIT
                        </p>
                    </div>
                </ButtonSpan>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        PHONE
                    </label>
                    <p className="px-1 rounded-lg texts">{phone == null ? '-' : `+62 ${phone}`}</p>
                </div>
                <div className="flex items-center gap-7 text-sm">
                    <ButtonSpan
                        type="submit"
                        onClick={() => setIsModalRemove(true)}
                    >
                        remove
                    </ButtonSpan>
                    <ButtonSpan
                        type="button"
                        fill="bg-neutral-700"
                        onClick={() => setIsModalPhone(true)}
                    >
                        <div className="flex space-x-2 items-center">
                            <AiOutlineEdit className="text-neutral-100" />
                            <p className="text-neutral-100 text-xs">
                                EDIT
                            </p>
                        </div>
                    </ButtonSpan>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <ButtonSpan
                    type="submit"
                    fill="bg-neutral-300"
                    onClick={() => setIsModalPassword(true)}
                >
                    Reset Password
                </ButtonSpan>
            </div>
            <EditNameModal isOpen={isModalName} onClose={() => setIsModalName(false)} isLoading={isLoading} handleUpdate={handleUpdate} />
            <EditPhoneModal isOpen={isModalPhone} onClose={() => setIsModalPhone(false)} isLoading={isLoading} handleUpdate={handleUpdate} />
            <RemovePhoneModal isOpen={isModalRemove} onClose={() => setIsModalRemove(false)} />
            <ChangeEmailModal isOpen={isModalEmail} setIsChangeEmailModal={setIsModalEmail} />
            <ChangePasswordModal isOpen={isModalPassword} onClose={() => setIsModalPassword(false)} />
        </div>
    );
};

export default UserSettings;