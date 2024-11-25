"use client"
import Button from "@/components/buttons/button"
import Input from "@/components/input/input"
import { forgotPasswordFetch } from "@/libs/fetch/auth"
import { forgotPasswordSchema } from "@/schemes/authSchema"
import { AxiosError } from "axios"
import { Form, Formik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"

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
                    <Form className="bg-neutral-900 w-full min-h-screen place-content-center items-center flex flex-col">
                        <Input name="email" type="email" placeholder="enter your email" error disable={isLoading}/>
                        <div className="w-fit">
                            <Button type="submit" auth disable={isLoading}>Reset Now</Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ForgotPassword