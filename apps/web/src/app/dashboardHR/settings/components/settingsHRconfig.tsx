"use client"
import ButtonSpan from "@/components/buttons/spanButtons"
import ImageCropper from "@/components/ImageCropper";
import { useAppSelector } from "@/redux/hooks"
import Image from "next/image"
import { useState } from "react";
import EditAvatarHRModal from "./editAvatarHRModal";
import RemoveAvatarHRModal from "./removeAvatarHRmodal";
import EditHR from "./editHR";

export default function SettingsHRconfig() {
    const { name, avatar } = useAppSelector((user) => user.user);
    const [isChangeAvatarModal, setIsChangeAvatarModal] = useState(false);
    const [isRemoveAvatarModal, setIsRemoveAvatarModal] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [cropImage, setCropImage] = useState<string | null>(null);

    return (
        <div className="flex flex-col w-full">
            <div className="max-w-[1200px] mx-5 min-h-screen">
                <div className="px-2 pt-8 pb-5">
                    <h1 className="text-[24px] font-semibold text-end text-black px-6">SETTINGS</h1>
                </div>
                <div className="md:w-full relative h-36 bg-[linear-gradient(to_bottom,_#C7CACD_50%,_#DDE1E4_50%)] rounded-t-3xl">
                    <div className="lg:w-full items-center absolute -bottom-6 left-8">
                        <div className="flex items-center gap-3 md:gap-5">
                            <Image
                                src={avatar || '/profileplaceholder.png'}
                                width={50}
                                height={50}
                                alt="settings-avatar"
                                className="rounded-full w-24 h-24 md:w-[120px] md:h-[120px] object-cover border-8 md:border-[13px] bg-slate-500 border-[#DDE1E4]"
                            />
                            <div className="flex gap-1 md:gap-5">
                                <ButtonSpan
                                    type="button"
                                    text1="change"
                                    text2="upload"
                                    aksata
                                    onClick={() => setIsChangeAvatarModal(true)}
                                />
                                <ButtonSpan
                                    type="submit"
                                    aksata
                                    onClick={() => setIsRemoveAvatarModal(true)}
                                >
                                    remove
                                </ButtonSpan>
                            </div>
                            <div className="font-bold text-black lg:text-2xl lg:pt-3 max-[1066px]:hidden absolute right-[77px] text-end">
                                {name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-full h-[400px] rounded-b-3xl bg-[#DDE1E4] px-2 pb-2 pt-4 lg:px-4 lg:pb-4 lg:pt-8">
                    <div className="bg-[#f0f4f8] w-full h-full rounded-3xl">
                        <EditHR />
                    </div>
                </div>
            </div>
            <EditAvatarHRModal setImage={setImage} cropImage={cropImage} isOpen={isChangeAvatarModal} onClose={() => setIsChangeAvatarModal(false)} />
            <RemoveAvatarHRModal isOpen={isRemoveAvatarModal} onClose={() => setIsRemoveAvatarModal(false)} />
            <ImageCropper
                image={image}
                setImage={setImage}
                onCropComplete={(crop) => setCropImage(crop)}
            />
        </div>
    )
}