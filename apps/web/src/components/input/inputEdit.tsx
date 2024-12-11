"use client"
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

interface InputEditProps {
    label?: string;
    name: string;
    type: React.HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    children?: React.ReactNode;
    nameInput?: boolean,
    passwordInput?: boolean,
    disabled?: boolean,
    error?: boolean
};

const InputEdit: React.FC<InputEditProps> = ({
    label,
    name,
    type,
    id,
    placeholder,
    children,
    nameInput,
    passwordInput,
    disabled,
    error
}) => {
    return (
        <div className={clsx(``, passwordInput && `md:h-[35px]`)}>
            {label && (
                <label className={clsx(
                    `text-gray-400 font-bold block text-sm`,
                    passwordInput && `text-xs`
                )}>
                    {label}
                </label>
            )}
            <Field
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={clsx(
                    `block w-full rounded-md outline-none bg-neutral-900`,
                    nameInput && `px-4 py-3`,
                    passwordInput && `py-1 px-4`,
                    disabled && `opacity-55`
                )}
            >
                {children}
            </Field>
            {error && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500 px-3 text-end text-xs font-extralight"
                />
            )}
        </div>
    )
};

export default InputEdit