'use client'
import ButtonSpan from '@/components/buttons/spanButtons'
import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'

interface SendOTPprops {
    isLoading: boolean,
    onClose: () => void,
    handleSendOTP: () => void,
    isOpen: boolean
}

const SendOTP: React.FC<SendOTPprops> = ({ isLoading, onClose, handleSendOTP, isOpen }) => {
    const { email } = useAppSelector(state => state.user)

    return (
        <div className={clsx(`text-neutral-300 flex-col gap-12 justify-between`, isOpen ? 'flex' : 'hidden')}>
            <div>
                <h1 className="text-center mt-1 text-2xl font-bold">Change email</h1>
            </div>
            <div className="mx-11 mt-8">
                <p className="text-center mb-6 font-extralight">we'll need to verify your old email address, <span className="font-medium">{email}</span>, in order to change it.</p>
            </div>
            <div className="flex justify-end gap-6">
                <ButtonSpan type="button" onClick={onClose}>
                    cancel
                </ButtonSpan>
                <ButtonSpan
                    type="submit"
                    disabled={isLoading}
                    fill="bg-neutral-300"
                    onClick={handleSendOTP}
                >
                    send verification code
                </ButtonSpan>
            </div>
        </div>
    )
}

export default SendOTP