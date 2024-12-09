"use client"
import ButtonSpan from "@/components/buttons/spanButtons";
import Modal from "@/components/Modal";
import { removeAvatarFetch } from "@/libs/fetch/auth";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { AxiosError } from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

interface RemoveAvatarModalProps {
    isOpen: boolean,
    onClose: () => void
}

const RemoveAvatarModal: React.FC<RemoveAvatarModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const handleRemove = async () => {
        setIsLoading(true)
        try {
            const res = await removeAvatarFetch()
            toast.success(res.data.msg)
            dispatch(loginAction(res.data.user))
            onClose()
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backgroundClose
        >
            <div className="flex flex-col gap-3 text-neutral-300">
                <h2 className="text-2xl font-semibold">Remove Avatar</h2>
                <p className="font-extralight mb-16">are you sure you want to remove your avatar?</p>
                <div className="flex flex-row justify-end px-2 gap-3">
                    <ButtonSpan
                        type="button"
                        onClick={onClose}
                    >
                        cancel
                    </ButtonSpan>
                    <ButtonSpan
                        type="submit"
                        onClick={handleRemove}
                        fill="bg-red-500"
                        disabled={isLoading}
                    >
                        remove
                    </ButtonSpan>
                </div>
            </div>
        </Modal>
    )
}

export default RemoveAvatarModal