"use client"
import AvatarButton from "@/components/buttons/avatarButton"
import ButtonSpan from "@/components/buttons/spanButtons"
import Modal from "@/components/Modal"
import { editUserFetch } from "@/libs/fetch/auth"
import { useAppDispatch } from "@/redux/hooks"
import { loginAction } from "@/redux/slices/userslice"
import { EditUserSlice } from "@/types/userTypes"
import { AxiosError } from "axios"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import toast from "react-hot-toast"
import * as yup from 'yup'

interface EditAvatarModalProps {
    isOpen: boolean,
    onClose: () => void,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    cropImage: string | null
}

interface OnValueBebas {
    avatar: string | null
}

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({ isOpen, onClose, setImage, cropImage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()
    const initialValue: OnValueBebas = {
        avatar: null
    }

    const validation = yup.object().shape({
        avatar: yup.string().required("file can't be empty")
    })

    const handleImageCropper = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0]

        if (file) {
            setFieldValue('avatar', file)
            const reader = new FileReader()
            reader.onload = () => { setImage(reader.result as string) }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdate = async (data: EditUserSlice) => {
        setIsLoading(true)
        try {
            const formData = new FormData();

            if (data.avatar) {
                formData.append('avatar', data.avatar)
            }

            const res = await editUserFetch(formData)
            dispatch(loginAction(res.data.user.updatedUser))
            toast.success('avatar has been changed')
            onClose()

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('error upload')
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => { }}
        >
            <Formik
                initialValues={initialValue}
                onSubmit={(value) => {
                    handleUpdate(value)  
                }}
                validationSchema={validation}
            >
                {({ setFieldValue }) => {                    
                    return (
                        <Form>
                            <div className="text-neutral-300">
                                <h1 className="text-center mt-1 text-2xl font-bold">Choose your image</h1>
                                <div className="w-full h-[150px] mt-8 mb-10 flex place-content-center items-center">
                                    <AvatarButton
                                        image={cropImage}
                                        onChange={(e) => handleImageCropper(e, setFieldValue)}
                                    />
                                </div>
                                <div className="flex justify-end gap-5">
                                    <ButtonSpan
                                        type="button"
                                        onClick={onClose}
                                    >
                                        cancel
                                    </ButtonSpan>
                                    <ButtonSpan
                                        type="submit"
                                        disabled={isLoading}
                                        fill="bg-neutral-300"
                                    >
                                        Upload
                                    </ButtonSpan>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default EditAvatarModal