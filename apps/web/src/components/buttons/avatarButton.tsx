import React from 'react'

interface KasiNamanyaProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement> ) => void
}

const AvatarButton: React.FC<KasiNamanyaProps> = ({onChange}) => {
    return (
        <label htmlFor="avatar" className='block'>
            <div className="relative rounded-3xl hover:border-none cursor-pointer min-w-[90px] min-h-[40px] overflow-hidden group active:scale-95 transition-transform duration-300 ease-in-out">
                <span className="absolute bg-neutral-300 text-neutral-950 inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-full group-active:scale-95" >
                    change
                </span>
                <span
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0 group-hover:bg-green-400 group-hover:text-black group-active:scale-95" >
                    upload
                </span>
            </div>
            <input type="file" id="avatar" accept="image/*" className="hidden" onChange={onChange} />
        </label>
    )
}

export default AvatarButton