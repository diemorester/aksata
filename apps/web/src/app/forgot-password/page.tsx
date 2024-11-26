"use client"
import Button from "@/components/buttons/button"
import Input from "@/components/input/input"
import { forgotPasswordFetch } from "@/libs/fetch/auth"
import { forgotPasswordSchema } from "@/schemes/authSchema"
import { AxiosError } from "axios"
import { Form, Formik } from "formik"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const Handler = async (data: { email: string }) => {
        setIsLoading(true)
        try {
            const res = await forgotPasswordFetch(data);
            toast.success(res.data.msg)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            };
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={(value) => {
            Handler(value)
        }}>
            {() => {
                return (
                    <Form className="bg-neutral-900 min-h-screen w-full relative place-content-center py-8 items-center flex">
                        <div className="flex flex-col items-center justify-center gap-24 px-5 md:w-[400px] md:h-[420px] ring-white/85 rounded-3xl backdrop-blur-md bg-neutral-800/85">
                            <div>
                                <p className="text-2xl font-medium text-center text-neutral-300">RESET PASSWORD</p>
                                <p className="text-sm text-neutral-300 text-center font-extralight pt-2">forgot your password? no worries,  we will send you reset instructions to your email</p>
                            </div>
                            <div className="max -w-[300px]">
                                <Input name="email" type="email" placeholder="enter your email" error disable={isLoading} />
                            </div>
                            <div className="flex flex-row items-center gap-14">
                                <Link href="/" className="text-neutral-300 relative italic">
                                    <div className="flex flex-row animate-bounce items-center gap-2 text-neutral-300 hover:text-neutral-100">
                                        <FaArrowLeftLong className="" />
                                        back to Login
                                    </div>
                                </Link>
                                <Button type="submit" submit disable={isLoading}>Reset Now</Button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ForgotPassword