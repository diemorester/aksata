'use client'
import Modal from "@/components/Modal";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { changeEmailFetch, sendVerificationChangeMailFetch, verificationOtpFetch } from "@/libs/fetch/auth";
import SendOTP from "./sendOTP";
import VerifyOTP from "./verifyOTP";
import ChangeEmailField from "./changeEmailField";
import { createCookie } from "@/libs/server";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { FormikHelpers } from "formik";

interface ChangeEmailModalProps {
    isOpen: boolean,
    setIsChangeEmailModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({ isOpen, setIsChangeEmailModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOTPField, setIsOTPField] = useState(false);
    const [isSendEmail, setIsSendEmail] = useState(true);
    const [isEmailField, setIsEmailField] = useState(false);
    const dispatch = useAppDispatch()

    const onClose = useCallback(() => {
        setIsChangeEmailModal(false)
        setIsEmailField(false)
        setIsOTPField(false)
        setIsSendEmail(true)
    }, [isOTPField, isOTPField, isSendEmail, isOpen])

    const handleSendOTP = async () => {
        setIsLoading(true);
        try {
            const res = await sendVerificationChangeMailFetch()
            toast.success(res.data.msg)
            setIsOTPField(true)
            setIsSendEmail(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    };

    const handleOTP = async (otp: string, action: FormikHelpers<{otp: string}>) => {
        setIsLoading(true)
        try {
            const res = await verificationOtpFetch(otp)
            toast.success(res.data.msg)
            setIsOTPField(false)
            setIsEmailField(true)
            action.resetForm()
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    };

    const handleEmail = async (email: string, action: FormikHelpers<{email: string}>) => {
        setIsLoading(true)
        try {
            const res = await changeEmailFetch(email)
            toast.success(res.data.msg)
            createCookie('access_token', res.data.token)
            dispatch(loginAction(res.data.newEmail))
            action.resetForm()
            onClose()
            setIsSendEmail(true)
            setIsEmailField(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ristoan
            backgroundClose
        >
            <SendOTP isLoading={isLoading} onClose={onClose} handleSendOTP={handleSendOTP} isOpen={isSendEmail} />
            <VerifyOTP isOpen={isOTPField} isLoading={isLoading} handleOTP={handleOTP} onClose={onClose} />
            <ChangeEmailField isLoading={isLoading} isOpen={isEmailField} handleEmail={handleEmail} onClose={onClose} />
        </Modal>
    )
}

export default ChangeEmailModal