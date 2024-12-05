"use client"
import clsx from "clsx";
import { ErrorMessage, Field, useField } from "formik";
import { MdChevronRight } from "react-icons/md";

interface PhoneInputEditProps {
    label?: string;
    name: string;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean
};

const formatPhoneNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");

    const noLeadingZero = numericValue.startsWith("0")
        ? numericValue.slice(1)
        : numericValue;

    const trimmedValue = noLeadingZero.slice(0, 13);

    return trimmedValue.replace(/(\d{3})(?=\d)/g, "$1 ");
}

const PhoneInputEdit: React.FC<PhoneInputEditProps> = ({
    label,
    name,
    type,
    placeholder,
    disabled,
    error
}) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);

        helpers.setValue(formattedValue)
    }
    return (
        <div>
            {label && (
                <label className="text-gray-400 font-bold block">
                    {label}
                </label>
            )}
            <div className="flex items-center bg-neutral-900 rounded-l-sm pl-5">
                <div className="flex items-center gap-1 cursor-pointer active:scale-95 italic bg-neutral-800 pl-2 pr-1 py-1 rounded-md">
                    +62
                    <MdChevronRight />
                </div>
                <input
                    id={name}
                    {...field}
                    type={type}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={clsx(
                        `px-4 py-3 block w-full rounded-sm outline-none bg-neutral-900`,
                        disabled && `opacity-55`,
                        error
                            ? `ring-rose-500 ring-offset-rose-500`
                            : `hover:ring-rose-600`
                    )}
                />
            </div>
            {error && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="mx-4 text-sm text-red-500 font-extralight"
                />
            )}
        </div>
    )
};

export default PhoneInputEdit