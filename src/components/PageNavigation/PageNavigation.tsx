import Button from "../Button/Button"

interface INavigationButtons {
    prevPage: any
    nextPage: any
    pageNumber: number
    isDisabledPrevButton: boolean
    isDisabledNextButton: boolean
}

const PageNavigation = ({prevPage, nextPage, pageNumber, isDisabledPrevButton: prevButtonIsDisabled, isDisabledNextButton: nextButtonIsDisabled}:INavigationButtons) => {
    return (
        <span>
          <Button disabled={prevButtonIsDisabled} handleClick={prevPage}>Назад</Button>
          <b>Текущая страница: {pageNumber}</b>
          <Button disabled={nextButtonIsDisabled} handleClick={nextPage}>Вперед</Button>
        </span>
    )
}

export default PageNavigation