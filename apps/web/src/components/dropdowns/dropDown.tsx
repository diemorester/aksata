'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { GiCheckMark } from 'react-icons/gi';

interface DropDownOptions {
    label: string;
    value: string;
}

interface DropDownProps {
    options: DropDownOptions[];
    onSelect: (value: string) => void;
    pengajuan?: boolean;
    pengajuanHR?: boolean;
    placeholder?: string;
}

const DropDown: React.FC<DropDownProps> = ({ onSelect, options, pengajuan, pengajuanHR, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(placeholder || options[0].label);

    const modalRef = useRef<HTMLDivElement>(null)

    const handleSelect = (value: string, label?: string) => {
        setSelected(label!);
        onSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickModal = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener(`click`, handleClickModal)
        }
        return () => {
            document.addEventListener('click', handleClickModal)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={modalRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    `flex gap-2 items-center w-full rounded-md justify-between transition-all`,
                    selected === placeholder
                        ? `border-2 py-[15px] px-5 text-neutral-500/65 border-off-white`
                        : pengajuan
                        ? `border-2 py-[15px] px-5 text-off-white border-off-white`
                        : `py-2 px-3 text-black`
                )}
            >
                {pengajuan ? `${selected}` : `Filter: ${selected}`}
                <FaAngleDown
                    className={clsx(
                        `transition-all duration-600`,
                        isOpen && `rotate-180`
                    )}
                />
            </button>
            {isOpen && (
                <div
                    className={clsx(
                        'absolute flex flex-col gap-y-2 py-2 shadow-md z-10 cursor-pointer text-start border border-black/20 rounded-md px-3 transform transition-transform origin-top duration-700 ease-in-out',
                        isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                        pengajuan ? "w-full bg-neutral-800 border-2 border-off-white" : "md:w-[168px] bg-slate-100"
                    )}
                    style={{transformOrigin: 'top'}}
                >
                    {options.map((value) => (
                        <div
                        className={clsx(
                            'flex items-center font-medium gap-x-2 rounded-md py-1 px-2 justify-between hover:bg-gray-200/50 transition-all duration-200',
                            selected === value.label
                                ? pengajuan
                                    ? 'text-off-white bg-off-white/10'
                                    : pengajuanHR
                                    ? 'text-black bg-neutral-700/15'
                                    : ''
                                : pengajuan
                                ? 'text-off-white'
                                : pengajuanHR
                                ? 'text-black'
                                : ''
                        )}
                        
                            key={value.value}
                            onClick={() => handleSelect(value.value, value.label)}
                        >
                            <p>{value.label}</p>
                            {selected === value.label && <GiCheckMark />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
