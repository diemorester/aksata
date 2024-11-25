"use client"
import Button from '@/components/buttons/button';
import Input from '@/components/input/input'
import { resetPasswordFetch } from '@/libs/fetch/auth';
import { resetPasswordSchema } from '@/schemes/authSchema'
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const ResetPassword = ({params}: {params: {token: string}}) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const Handler = async (password: string, token: string) => {
        setIsLoading(true);
        try {
            const res = await resetPasswordFetch(password, token);
            toast.success(res.data.msg)
            router.push('/')
           
        } catch (error: any) {
            if (error.response.data.status == "ERROR MIDDLEWARE") {
                toast.error('token expired')
              } else if (error instanceof AxiosError) {
                toast.error(error.response?.data)
              };
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={resetPasswordSchema}
            onSubmit={(value) => {Handler(value.password, params.token)}}
        >
            {() => {
                return (
                    <Form>
                        <div className="relative w-fit">
                            <Input
                                error
                                disable={isLoading}
                                name="password"
                                type={isPasswordRevealed ? "text" : "password"}
                                placeholder="password"
                            />
                            <button
                                className="absolute right-2 top-[4px] text-white"
                                type="button"
                                onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
                            >
                                {isPasswordRevealed ? (
                                    <IoEyeOutline size={19} />
                                ) : (
                                    <IoEyeOffOutline size={19} />
                                )}
                            </button>
                        </div>
                        <div className="relative w-fit">
                            <Input
                                error
                                disable={isLoading}
                                name="confirmPassword"
                                type={isConfirmPasswordRevealed ? "text" : "password"}
                                placeholder="password"
                            />
                            <button
                                className="absolute right-2 top-[4px] text-white"
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
                        <Button type='submit' auth disable={isLoading}>Reset Your Password</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ResetPassword