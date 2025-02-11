'use client'

import ButtonSpan from "@/components/buttons/spanButtons"
import InputEdit from "@/components/input/inputEdit"
import clsx from "clsx"
import { Form, Formik, FormikHelpers } from "formik"
import * as yup from 'yup'

interface VerifyOTPprops {
    isOpen: boolean,
    isLoading: boolean,
    handleOTP: (otp: string, action: FormikHelpers<{ otp: string }>) => void
    onClose: () => void
}

const VerifyOTP: React.FC<VerifyOTPprops> = ({ isOpen, handleOTP, isLoading, onClose }) => {
    return (
        <Formik
            initialValues={{ otp: '' }}
            onSubmit={(value, action) => { handleOTP(value.otp, action) }}
            validationSchema={yup.object().shape({
                otp: yup.string().required("OTP code can't be empty")
            })}
        >
            <Form className={clsx(`text-neutral-300 flex-col gap-12 justify-between`, isOpen ? 'flex' : 'hidden')}>
                <div>
                    <h1 className="text-center mt-1 text-2xl font-bold">Enter OTP</h1>
                    <p className="text-center text-sm mb-8 font-extralight">enter the code we&apos;ve sent to your email to prove that you&apos;re really you</p>
                </div>
                <div className="mt-5">
                    <InputEdit
                        label="VERIFICATION CODE"
                        type="text"
                        name="otp"
                        nameInput
                        error
                        disabled={isLoading}
                        autocomplete="off"
                    />
                </div>
                <div className="flex justify-end gap-6 mt-10">
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
                        disabled={isLoading}
                        fill="bg-neutral-300"
                    >
                        confirm
                    </ButtonSpan>
                </div>
            </Form>
        </Formik>
    )
}

export default VerifyOTP