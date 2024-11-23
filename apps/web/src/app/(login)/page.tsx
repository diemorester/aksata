"use client"
import Button from "@/components/buttons/button";
import Input from "@/components/input/input";
import { loginUser, registerUser } from "@/libs/fetch/auth";
import { createCookie } from "@/libs/server";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { loginSchema, RegisterSchema } from "@/schemes/authSchema";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

type VariantAuth = "Register" | "Login"

export default function Home() {
  const router = useRouter()
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [variantAuth, setVariantAuth] = useState<VariantAuth>("Login")
  const dispatch = useAppDispatch()

  const ToggleAuth = useCallback(() => {
    if (variantAuth == "Login") {
      setVariantAuth("Register")
    } else {
      setVariantAuth("Login")
    }
  }, [variantAuth])

  const HandleAuth = async (
    data: IRegister | ILogin,
    action: FormikHelpers<IRegister | ILogin>
  ) => {
    setIsLoading(true)

    if (variantAuth == "Login") {
      try {
        const res = await loginUser(data)
        const earnToken = {
          ...res.data.user, token: res.data.token
        }
        toast.success(res.data.msg)
        createCookie('token', res.data.token)
        dispatch(loginAction(earnToken))
        action.resetForm()
        
        if (res.data.user.role == "AdminHR") {
          router.push('/dashboardHR')
        } else if (res.data.user.role == "AdminGudang") {
          router.push('/dashboardGudang')
        } else if (res.data.user.role == "SuperAdmin") {
          router.push('/dashboardAdmin')
        } else {
          router.push('/dashboard')
        }
        
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data)
        };

      } finally { setIsLoading(false) }
    }

    if (variantAuth == "Register") {
      try {
        const res = await registerUser(data)
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
      <Formik initialValues={variantAuth == "Register" ? initialRegisterValues : initialLoginValues} validationSchema={variantAuth == "Register" ? RegisterSchema : loginSchema} onSubmit={(value, action) => {
        HandleAuth(value, action)
      }}>
        {() => {
          return (
            <Form>
              <div className={`flex flex-col ${variantAuth == "Login" ? 'gap-16' : 'gap-5'}`}>
                <h1 className="text-center text-5xl text-white font-bold pb-16">{variantAuth == "Login" ? "LOGIN" : "REGISTER"}</h1>
                <div className={`flex flex-col ${variantAuth == "Login" ? 'gap-10' : 'gap-6'}`}>
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
                  {variantAuth == "Login" && <h2 className="text-center text-xs text-white italic">not registered? Sign Up <span onClick={ToggleAuth} className="font-bold cursor-pointer">Here</span></h2>}
                </div>
              </div>
            </Form>)
        }}
      </Formik>
    </div>
  )
}