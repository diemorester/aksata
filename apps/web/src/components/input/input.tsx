import { ErrorMessage, Field } from "formik"

interface IInput {
    name: string,
    type: React.HTMLInputTypeAttribute,
    id?: string
    placeholder?: string,
    children?: React.ReactNode
    disable?: boolean
    error?: boolean
}

const Input: React.FC<IInput> = ({ name, type, children, disable, id, placeholder, error }) => {
    return (
        <div className= "h-[65px]">
            <Field name={name} type={type} disabled={disable} id={id} placeholder={placeholder} className="text-white border-b-4 px-2 py-1 text-lg border-b-white md:w-[450px] rounded-sm place bg-transparent placeholder:italic focus:outline-none">
                {children}
            </Field>
            {error && (<ErrorMessage name={name} component={`div`} className="text-red-500 text-sm italic px-3 text-end" />)}
        </div>
    )
}

export default Input