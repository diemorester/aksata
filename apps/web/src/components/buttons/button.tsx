import clsx from "clsx"

interface IButton {
    children: React.ReactNode,
    disable?: boolean,
    danger?: boolean,
    type: "button" | "submit" | "reset",
    outline?: boolean,
    fullwidth?: boolean,
    auth?: boolean,
    onclick?: () => void
}

const Button: React.FC<IButton> = ({ children, disable, danger, type, outline, auth, fullwidth, onclick }) => {
    return (
        <button className={clsx(`bg-white rounded-sm text-xl`, auth && "w-[131px] h-[51px]", danger && "bg-red-500 text-white", disable && "opacity-30" )} onClick={onclick} type={type} disabled={disable}>
            {children}
        </button>
    )
}

export default Button