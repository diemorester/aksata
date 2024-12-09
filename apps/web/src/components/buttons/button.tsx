import clsx from "clsx"

interface IButton {
    children: React.ReactNode,
    disable?: boolean,
    danger?: boolean,
    type: "button" | "submit" | "reset",
    transparent?: boolean
    auth?: boolean,
    submit?: boolean,
    onclick?: () => void
}

const Button: React.FC<IButton> = ({ children, disable, danger, type, auth, transparent, submit, onclick }) => {
    return (
        <button className={clsx(`active:scale-95 px-4 py-2`, auth && "w-full h-[45px] font-medium rounded-3xl bg-neutral-300 hover:bg-neutral-200", submit && "font-medium rounded-2xl px-1 transition duration-100 bg-neutral-300 hover:bg-green-500 hover:text-white", danger && "bg-red-600 text-white rounded-[4px]", disable && "opacity-30", transparent && "hover:underline" )} onClick={onclick} type={type} disabled={disable}>
            {children}
        </button>
    )
}

export default Button