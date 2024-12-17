"use client"
import Button from "@/components/buttons/button";
import Input from "@/components/input/input";
import { loginUser, registerUser } from "@/libs/fetch/auth";
import { createCookie, navigate } from "@/libs/server";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { loginSchema, RegisterSchema } from "@/schemes/authSchema";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
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
        const res = await loginUser(data); // Login API request

        console.log(res.data);

        createCookie('access_token', res.data.accessToken); // Menyimpan token di cookie
        dispatch(loginAction(res.data.user)); // Dispatch action untuk update state Redux dengan user data

        toast.success(res.data.msg)
        action.resetForm();

        if (res.data.user.role == "AdminHR") {
          navigate('/dashboardHR')
        } else if (res.data.user.role == "AdminGudang") {
          navigate('/dashboardGudang')
        } else if (res.data.user.role == "SuperAdmin") {
          navigate('/superAdmin')
        } else {
          navigate('/dashboard')
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
    <div className="min-h-screen w-full relative place-content-center py-8 items-center flex bg-custom-image bg-center bg-cover bg-no-repeat">
      <Formik
        initialValues={
          variantAuth == "Register" ? initialRegisterValues : initialLoginValues
        }
        validationSchema={
          variantAuth == "Register" ? RegisterSchema : loginSchema
        }
        onSubmit={(value, action) => {
          HandleAuth(value, action);
        }}
      >
        {() => {
          return (
            <Form>
              <div
                className={`flex flex-col gap-24 justify-center md:w-[450px] md:h-[480px] ring-white/85 rounded-lg backdrop-blur-md bg-neutral-800/85 ${variantAuth == "Login" ? "py-0" : "gap-9"
                  }`}
              >
                <div>
                  <h1 className={`text-center text-4xl text-white font-bold ${variantAuth == "Login" ? "pb-0" : "pb-10"} `}>
                    {variantAuth == "Login" ? "LOGIN" : "REGISTER"}
                  </h1>
                </div>
                <div className="flex flex-col gap-12">
                  <div
                    className={`flex flex-col items-center ${variantAuth == "Login" ? "gap-12" : "gap-10"
                      }`}
                  >
                    {variantAuth == "Register" && (
                      <Input
                        error
                        disable={isLoading}
                        name="name"
                        type="text"
                        placeholder="name"
                      />
                    )}
                    <Input
                      error
                      disable={isLoading}
                      name="email"
                      type="email"
                      placeholder="email"
                    />
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
                      <Link href="/forgot-password" className={`text-sm px-2 text-neutral-300 hover:text-neutral-100 ${variantAuth == "Login" ? "visible" : "hidden"} `}>forgot password?</Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center px-[54px]">
                    <Button disable={isLoading} type="submit" auth>
                      {variantAuth == "Login" ? "LOGIN" : "REGISTER"}
                    </Button>
                    {variantAuth == "Login" && (
                      <h2 className="text-center text-xs text-neutral-300 italic">
                        not registered? Sign Up{" "}
                        <span
                          onClick={ToggleAuth}
                          className="font-bold cursor-pointer hover:text-neutral-100 border-b"
                        >
                          Here
                        </span>
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}