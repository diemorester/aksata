"use client"
import { FetchEmail } from "@/libs/fetch/auth";
import { AxiosError } from "axios";
import React, { useState } from "react";

interface IButtonProps {
    token: string,
}

const SplitButton: React.FC<IButtonProps> = ({token}) => {    
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        setIsLoading(true)
        try {
          const res = await FetchEmail(token)
          alert('fetch succeeded')
          console.log(res);
          
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            alert(error.response?.data)
          }
        } finally {
          setIsLoading(false)
        }
      }

    return (
        <button onClick={onSubmit} disabled={isLoading} className="relative flex justify-center items-center w-36 h-12 active:scale-95 font-bold rounded-md bg-[#3CB371] overflow-hidden group">
            <div className="absolute left-0 top-0 h-full w-1/2 text-black bg-[#F8F8FF] flex pl-4 items-center justify-center transition-transform duration-500 group-hover:-translate-x-full">
                VERIFY
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 text-black bg-[#F8F8FF] flex pr-3 items-center justify-center transition-transform duration-500 group-hover:translate-x-full">
                HERE
            </div>
            <span className="absolute text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                VERIFY NOW
            </span>
        </button>
    );
};

export default SplitButton;