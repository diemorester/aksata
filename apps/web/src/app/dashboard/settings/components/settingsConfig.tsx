"use client"
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import UserSettings from "./editUser";
import ButtonSpan from "@/components/buttons/spanButtons";
import AvatarButton from "@/components/buttons/avatarButton";
import { useState } from "react";
import EditAvatarModal from "./editAvatarModal";
import ImageCropper from "@/components/ImageCropper";

export default function SettingsConfig() {
  const { name, avatar } = useAppSelector((user) => user.user);
  const [isOpenItu, setIsOpenItu] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cropImage, setCropImage] = useState<string | null>(null);

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
                <ButtonSpan
                  type="button"
                  text1="change"
                  text2="upload"
                  onClick={() => setIsOpenItu(true)}
                />
                <ButtonSpan
                  type="submit"
                >
                  remove
                </ButtonSpan>
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
      <EditAvatarModal setImage={setImage} onClose={() => setIsOpenItu(false)} isOpen={isOpenItu} />
      <ImageCropper
        image={image}
        setImage={setImage}
        onCropComplete={(crop) => setCropImage(crop)}
      />
    </div>
  )
}