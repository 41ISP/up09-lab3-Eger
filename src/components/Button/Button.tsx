import { PropsWithChildren } from "react";

interface IButton extends PropsWithChildren {
	handleClick: any;
	disabled?: boolean;
}

const Button = ({ handleClick, children, disabled }: IButton) => {
	return (
		<button disabled={disabled ?? false} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
