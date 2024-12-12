import Button from "../Button/Button";

interface INavigationButtons {
	prevPage: any;
	nextPage: any;
	pageNumber: number;
	isDisabledPrevButton: boolean;
	isDisabledNextButton: boolean;
}

const PageNavigation = ({
	prevPage,
	nextPage,
	pageNumber,
	isDisabledPrevButton: prevButtonIsDisabled,
	isDisabledNextButton: nextButtonIsDisabled,
}: INavigationButtons) => {
	return (
		<span>
			<Button disabled={prevButtonIsDisabled} handleClick={prevPage}>
				Back
			</Button>
			<b>Current page: {pageNumber}</b>
			<Button disabled={nextButtonIsDisabled} handleClick={nextPage}>
				Next
			</Button>
		</span>
	);
};

export default PageNavigation;
