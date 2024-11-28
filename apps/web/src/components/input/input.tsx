import { ErrorMessage, Field } from "formik";

interface IInput {
    name: string;
    type: React.HTMLInputTypeAttribute;
    id?: string;
    placeholder?: string;
    children?: React.ReactNode;
    disable?: boolean;
    error?: boolean;
}

const Input: React.FC<IInput> = ({
    name,
    type,
    children,
    disable,
    id,
    placeholder,
    error,
}) => {
    return (
        <div className="h-[35px]">
            <Field
                name={name}
                type={type}
                disabled={disable}
                id={id}
                autocomplete="off"
                placeholder={placeholder}
                className="text-white border-b-2 px-2 pb-1 text-sm border-b-white md:w-[350px] rounded-sm focus:outline-none bg-transparent 
        focus:bg-transparent focus:text-white"
            >
                {children}
            </Field>
            {error && (
                <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500 px-3 text-end text-xs"
                />
            )}
        </div>
    );
};

export default Input;
