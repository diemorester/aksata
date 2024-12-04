import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

interface InputEditProps {
    label?: string;
    name: string;
    type: React.HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    error?: boolean
};

const InputEdit: React.FC<InputEditProps> = ({
    label,
    name,
    type,
    id,
    placeholder,
    children,
    disabled,
    error
}) => {
    return (
        <div>
            {label && (
                <label>
                    {label}
                </label>
            )}
            <Field
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                className={clsx(
                    `px-4 py-3 `,
                    disabled && `opacity-55`,
                    error 
                    ? `ring-rose-500 ring-offset-rose-500`
                    : `hover:ring-rose-600`
                )}
            >
                {children}
            </Field>
            {error && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500"
                />
            )};
        </div>
    )
};

export default InputEdit