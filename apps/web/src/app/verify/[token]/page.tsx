"use client"
import SplitButton from "@/components/buttons/splitbutton"
import { fetchEmail } from "@/libs/fetch/auth"
import { AxiosError } from "axios"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

const VerifiedPage = ({ params }: { params: { token: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNowVerified, setIsNowVerified] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await fetchEmail(params.token)
      toast.success(res.data.msg)
      setIsNowVerified(true)
    } catch (error: any) {
      if (error.response.data.status == "ERROR MIDDLEWARE") {
        toast.error('token expired')
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      }

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen text-center place-content-center bg-neutral-900 text-white'>
      <div className="flex flex-col justify-center items-center">
        {isNowVerified ? (
          <div className="space-y-3">
            <p className="text-xl font-bold">
              you are now <span className="text-green-500 font-extrabold">verified</span>
            </p>
            <div className="animate-bounce relative group">
              <Link href="/" className="relative">
                click here to Login
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </div>
          </div>
        ) :
          <>
            <h2 className="pb-5">
              Click the button to verify
            </h2>
            <SplitButton onClick={onSubmit} disable={isLoading} /></>}
      </div>
    </div>
  )
}

export default VerifiedPage