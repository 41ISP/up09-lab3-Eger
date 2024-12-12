interface IInput {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ state, setState }: IInput) => {
	return (
		<input
			type="text"
			value={state}
			onChange={(e) => setState(e.target.value)}
		/>
	);
};

export default Input;
