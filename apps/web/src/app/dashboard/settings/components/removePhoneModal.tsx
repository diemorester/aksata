"use client"
import ButtonSpan from "@/components/buttons/spanButtons"
import Modal from "@/components/Modal"
import { removePhoneFetch } from "@/libs/fetch/auth"
import { useAppDispatch } from "@/redux/hooks"
import { loginAction } from "@/redux/slices/userslice"
import { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

interface RemovePhoneModalProps {
    isOpen: boolean,
    onClose: () => void
}

const RemovePhoneModal: React.FC<RemovePhoneModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()

    const handleRemove = async () => {
        setIsLoading(true)
        try {
            const res = await removePhoneFetch()
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
            ristoan
            backgroundClose
        >
            <div className="flex flex-col gap-3 text-neutral-300">
                <div>
                    <h2 className="text-2xl font-semibold">Remove phone number</h2>
                    <p className='text-sm mb-16 font-extralight'>are you sure you want to remove your number?</p>
                </div>
                <div className="flex flex-row justify-end px-2 gap-6">
                    <ButtonSpan
                        type="button"
                        ristoan
                        onClick={onClose}
                    >
                        cancel
                    </ButtonSpan>
                    <ButtonSpan
                        type="submit"
                        ristoan
                        onClick={handleRemove}
                        fill="bg-red-500"
                        disabled={isLoading}
                    >
                        Remove
                    </ButtonSpan>
                </div>
            </div>
        </Modal>
    )
}

export default RemovePhoneModal