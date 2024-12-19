'use client'
import clsx from "clsx";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface DropDownOptions {
    label: string;
    value: string;
}

interface DropDownProps {
    options: DropDownOptions[];
    onSelect: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ onSelect, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(options[0].label);
    const handleSelect = (value: string, label?: string) => {
        setSelected(label!)
        onSelect(value)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex gap-2 items-center">
                {selected}
                <FaAngleDown className={clsx(``, isOpen && `rotate-180`)}/>
            </button>
            {isOpen && (
                <div className="absolute bg-slate-100 md:w-[168px] -left-[13px] top-6 cursor-pointer text-start border-black px-3">
                    {options.map((value) => (
                        <div key={value.value} onClick={() => handleSelect(value.value, value.label)}>
                            {value.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropDown