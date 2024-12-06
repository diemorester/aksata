"use client"
import AvatarButton from "@/components/buttons/avatarButton"
import ImageCropper from "@/components/ImageCropper"
import Modal from "@/components/Modal"
import { editUserFetch } from "@/libs/fetch/auth"
import { useAppDispatch } from "@/redux/hooks"
import { loginAction } from "@/redux/slices/userslice"
import { EditUserSlice } from "@/types/userTypes"
import { AxiosError } from "axios"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import toast from "react-hot-toast"

interface EditAvatarModalProps {
    isOpen: boolean,
    onClose: () => void,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
}

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({ isOpen, onClose, setImage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()
    const handleImageCropper = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => { setImage(reader.result as string) }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdate = async (data: EditUserSlice) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            if (data.avatar) {
                formData.append('avatar', data.avatar)
            }

            const res = await editUserFetch(formData)
            dispatch(loginAction(res.data.user.updatedUser))
            toast.success(res.data.msg)

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
            onClose={() => {}}
        >
            <Formik
                initialValues={{ avatar: null }}
                onSubmit={(value) => {handleUpdate(value)}}
            >
                {() => {
                    return (
                        <Form>
                            <AvatarButton
                                onChange={handleImageCropper}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default EditAvatarModal