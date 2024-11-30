import { PropsWithChildren } from "react"

interface IButton extends PropsWithChildren {
    handleClick: any
}

const Button = ({handleClick, children}: IButton) => {
    return (
        <button onClick={handleClick}>{children}</button>
    )
}

export default Button