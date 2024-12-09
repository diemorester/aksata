"use client"
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";

interface KasiNamanyaProps {
    image: string | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AvatarButton: React.FC<KasiNamanyaProps> = ({ image, onChange }) => {
    return (
        <label htmlFor="avatar" className='cursor-pointer'>
            {image ? (
                <Image
                    src={image || '/profileplaceholder.png'}
                    width={40}
                    height={40}
                    alt="image-preview"
                    className="rounded-full w-[165px] h-[165px]"
                />
            ) : (
                <div className="rounded-full border-[3px] border-neutral-300 bg-neutral-300 p-14">
                    <LuImagePlus
                        className="w-10 h-10 text-neutral-600"
                    />
                </div>
            )}
            <input type="file" id="avatar" accept="image/*" className="hidden" onChange={onChange} />
        </label>
    )
}

export default AvatarButton