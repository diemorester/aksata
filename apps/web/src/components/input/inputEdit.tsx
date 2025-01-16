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
    aksata?: boolean,
    disabled?: boolean,
    error?: boolean
    autocomplete?: string
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
    aksata,
    disabled,
    error,
    autocomplete
}) => {
    return (
        <div className={clsx(``, nameInput && `md:h-[69px]`, passwordInput && `md:h-[35px]`, aksata && `md:h-[35px]`)}>
            {label && (
                <label className={clsx(
                    `text-gray-400 font-bold block text-sm`,
                    passwordInput && `text-xs`,
                    aksata && 'text-xs text-neutral-700'
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
                autoComplete={autocomplete}
                className={clsx(
                    `block w-full rounded-md outline-none`,
                    nameInput && `px-4 py-3 bg-neutral-900`,
                    passwordInput && `py-1 px-4 bg-neutral-900`,
                    aksata && `bg-[#DDE1E4] py-1 px-4`,
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