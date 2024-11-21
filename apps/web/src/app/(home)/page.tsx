"use client"
import Button from "@/components/button";
import Input from "@/components/input/input";
import { RegisterUser } from "@/libs/fetch/auth";
import { RegisterSchema } from "@/schemes/authSchema";
import { AxiosError } from "axios";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

type VariantAuth = "Register" | "Login"

export default function Home() {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [variantAuth, setVariantAuth] = useState<VariantAuth>("Login")

  const ToggleAuth = useCallback(() => {
    if (variantAuth == "Login") {
      setVariantAuth("Register")
    } else {
      setVariantAuth("Login")
    }
  }, [variantAuth])

  const HandleAuth = async (data: IRegister, action: FormikHelpers<IRegister>) => {
    setIsLoading(true)
    if (variantAuth == "Login") {
      try {

      } catch (error) {

      }
    }
    if (variantAuth == "Register") {
      try {
        const res = await RegisterUser(data)
        toast.success(res.data.msg)
        action.resetForm()
        setVariantAuth("Login")

      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data)
        };

      } finally { setIsLoading(false) }
    }
  }

  const initialLoginValues = {
    email: "",
    password: ""
  }

  const initialRegisterValues = {
    name: "",
    email: "",
    password: ""
  }

  return (
    <div className="min-h-screen place-content-center items-center flex bg-neutral-900 pt-3">
      <Formik initialValues={variantAuth == "Register" ? initialRegisterValues : initialLoginValues} validationSchema={RegisterSchema} onSubmit={(value, action) => {
        HandleAuth(value, action)
      }}>
        {() => {
          return (
            <Form>
              <div className={`flex flex-col ${variantAuth == "Login" ? 'gap-20' : 'gap-[70px] mb-3'}`}>
                <h1 className="text-center text-5xl text-white font-bold">{variantAuth == "Login" ? "LOGIN" : "REGISTER"}</h1>
                <div className={`flex flex-col ${variantAuth == "Login" ? 'gap-20' : 'gap-8'}`}>
                  {variantAuth == "Register" && <Input error disable={isLoading} name="name" type="text" placeholder="name" />}
                  <Input error disable={isLoading} name="email" type="email" placeholder="email" />
                  <div className="relative w-fit">
                    <Input error disable={isLoading} name="password" type={isPasswordRevealed ? "text" : "password"} placeholder="password" />
                    <button className="absolute right-2 top-[6px] text-white" type="button" onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}>
                      {isPasswordRevealed ? <IoEyeOutline size={23} /> : <IoEyeOffOutline size={23} />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <Button disable={isLoading} type="submit" auth>{variantAuth == "Login" ? "LOGIN" : "REGISTER"}</Button>
                  {variantAuth == "Login" && <h2 className="text-center text-white italic">not registered? Sign Up <span onClick={ToggleAuth} className="font-bold cursor-pointer">Here</span></h2>}
                </div>
              </div>
            </Form>)
        }}
      </Formik>
    </div>
  )
}