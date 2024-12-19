'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { GiCheckMark } from 'react-icons/gi';

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
    setSelected(label!);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 items-center"
      >
        Filter: {selected}
        <FaAngleDown
          className={clsx(
            `transition-all duration-600`,
            isOpen && `rotate-180`,
          )}
        />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute flex flex-col gap-y-2 py-2  shadow-md bg-slate-100 md:w-[168px] -left-[13px] top-6 cursor-pointer text-start border border-black/20 rounded-md px-3 transition-all duration-700',
            isOpen ? 'opacity-100 scale-100 ' : 'opacity-0 scale-95',
          )}
        >
          {options.map((value) => (
            <div
              className={clsx(
                'flex items-center font-medium gap-x-2 rounded-md py-1 px-2 justify-between hover:bg-gray-200/40 transition-all duration-200',
                selected === value.label && 'bg-gray-200',
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
