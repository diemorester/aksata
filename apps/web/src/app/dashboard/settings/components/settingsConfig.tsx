"use client"
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import UserSettings from "./editUser";

export default function SettingsConfig() {
  const { name, avatar } = useAppSelector((user) => user.user);

  return (
    <div className="flex flex-col">
      <div className="lg:w-[1190px] mx-6">
        <h1 className="text-end text-[27px] font-semibold text-neutral-100 px-3 py-6">Settings</h1>
        <div className="md:w-full relative md:h-36 bg-[linear-gradient(to_bottom,_#0a0a0a_50%,_#1a1919_50%)] rounded-t-3xl">
          <div className="md:w-full items-center absolute -bottom-6 left-8">
            <div className="flex items-center gap-5">
              <Image
                src={avatar || '/profileplaceholder.png'}
                width={50}
                height={50}
                alt="settings-avatar"
                className="rounded-full w-[120px] h-[120px] object-cover object-top border-[13px] border-[#1a1919]"
              />
              <div className="flex gap-5">
                <div className="flex">
                  <button className="relative rounded-3xl hover:border-none min-w-[90px] min-h-[40px] overflow-hidden group active:scale-95 transition-transform duration-300 ease-in-out">
                    <span className="absolute bg-neutral-300 text-neutral-950 inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-full group-active:scale-95" >
                      change
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:bg-green-400 group-hover:text-black group-active:scale-95" >
                      upload
                    </span>
                  </button>
                </div>
                <button className="bg-transparent relative group text-neutral-100 active:scale-95">
                  delete
                  <span className="absolute bottom-1 left-1/2 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                </button>
              </div>
              <div className="font-bold text-neutral-50 text-3xl pt-3 absolute right-[77px] text-end">
                {name}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-full md:h-[400px] rounded-b-3xl bg-[#1a1919] px-4 pb-4 pt-8">
          <div className="bg-neutral-800 w-full h-full rounded-3xl">
            <UserSettings />
          </div>
        </div>
      </div>
    </div>
  )
}