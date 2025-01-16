'use client'
import ButtonSpan from "@/components/buttons/spanButtons";
import InputEdit from "@/components/input/inputEdit";
import Modal from "@/components/Modal";
import { changePasswordFetch } from "@/libs/fetch/auth";
import { changePasswordSchema } from "@/schemes/authSchema";
import { AxiosError } from "axios";
import { Formik, Form } from "formik";
import { useState } from "react";
import toast from "react-hot-toast"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface ChangePasswordModalHRProps {
    isOpen: boolean;
    onClose: () => void
}

interface PasswordHRValue {
    oldpass: string;
    newpass: string,
    confirmpass: string
}

const ChangePasswordModalHR: React.FC<ChangePasswordModalHRProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOldPasswordRevealed, setIsOldPasswordRevealed] = useState(false);
    const [isNewPasswordRevealed, setIsNewPasswordRevealed] = useState(false);
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] = useState(false);

    const handleUpdate = async (values: PasswordHRValue) => {
        setIsLoading(true)
        try {
            const res = await changePasswordFetch(values)
            toast.success(res.data.msg)
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
            aksata
            backgroundClose
        >
            <Formik
                initialValues={{
                    oldpass: '',
                    newpass: '',
                    confirmpass: ''
                }}
                onSubmit={(values) => {
                    handleUpdate(values)
                }}
                validationSchema={changePasswordSchema}
            >
                {({ errors }) => {
                    return (
                        <Form className="text-black flex flex-col gap-8 justify-between">
                            <div>
                                <h1 className="text-center mt-1 text-2xl font-bold">Change Password</h1>
                                <p className="text-center mb-6 font-extralight text-sm">enter your new password here</p>
                            </div>
                            <div className="flex flex-col gap-9">
                                <div className="relative w-full">
                                    <InputEdit
                                        label="CURRENT PASSWORD"
                                        name="oldpass"
                                        aksata
                                        disabled={isLoading}
                                        type={isOldPasswordRevealed ? "text" : "password"}
                                        error={!!errors.oldpass}
                                    />
                                    <button
                                        className="absolute right-2 -bottom-[7px] text-black"
                                        type="button"
                                        onClick={() => setIsOldPasswordRevealed(!isOldPasswordRevealed)}
                                    >
                                        {isOldPasswordRevealed ? (
                                            <IoEyeOutline size={19} />
                                        ) : (
                                            <IoEyeOffOutline size={19} />
                                        )}
                                    </button>
                                </div>
                                <div className="relative w-full">
                                    <InputEdit
                                        label="NEW PASSWORD"
                                        name="newpass"
                                        aksata
                                        disabled={isLoading}
                                        type={isNewPasswordRevealed ? "text" : "password"}
                                        error={!!errors.newpass}
                                    />
                                    <button
                                        className="absolute right-2 -bottom-[7px] text-black"
                                        type="button"
                                        onClick={() => setIsNewPasswordRevealed(!isNewPasswordRevealed)}
                                    >
                                        {isNewPasswordRevealed ? (
                                            <IoEyeOutline size={19} />
                                        ) : (
                                            <IoEyeOffOutline size={19} />
                                        )}
                                    </button>
                                </div>
                                <div className="relative w-full">
                                    <InputEdit
                                        label="CONFIRM PASSWORD"
                                        name="confirmpass"
                                        aksata
                                        disabled={isLoading}
                                        type={isConfirmPasswordRevealed ? "text" : "password"}
                                        error={!!errors.confirmpass}
                                    />
                                    <button
                                        className="absolute right-2 -bottom-[7px] text-black"
                                        type="button"
                                        onClick={() => setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed)}
                                    >
                                        {isConfirmPasswordRevealed ? (
                                            <IoEyeOutline size={19} />
                                        ) : (
                                            <IoEyeOffOutline size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end gap-6 mt-10">
                                <ButtonSpan type="button" onClick={onClose} aksata>
                                    cancel
                                </ButtonSpan>
                                <ButtonSpan
                                    type="submit"
                                    disabled={isLoading}
                                    aksata
                                    fill="bg-black"
                                >
                                    confirm
                                </ButtonSpan>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
  )
}

export default ChangePasswordModalHR