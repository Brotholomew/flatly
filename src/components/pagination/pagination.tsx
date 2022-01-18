import Button from "../utils/Button";
import {ButtonType} from "../../common/enums/ButtonType";

interface paginationInterface {
    maxNumber: number,
    currentPage: number,
    changePage: (page: number) => void
}

const Pagination = (props: paginationInterface) => {
    const currentPage = props.currentPage;
    const max = props.maxNumber;
    const min = 1;

    // callback to change pages using pagination navigation buttons
    const changePage = props.changePage

    const generatePaginationBar = (min: number, max: number, current: number) => {
        const displayed = 7;
        const distance = Math.floor(7 / 2);

        const offset = current - min < distance + 1 ? 0 : Math.min(max - displayed, current - (distance + 1));
        const beginning = min + offset;

        let pages: number[] = []
        for (let i = beginning; i < Math.min(beginning + displayed, max + 1); i++)
            pages = [...pages, i];

        return(
            <>
                <Button
                    click={() => changePage(currentPage - 1)}
                    disabled={current === min}
                    icon={'caret-left'}
                    type={ButtonType.BLANK}
                />

                {pages.map((value, index) =>
                    <Button
                        type={current === value ? ButtonType.PAGINATION_CURRENT : ButtonType.PAGINATION}
                        disabled={current === value}
                        click={() => changePage(value)}
                        key={index}
                    >
                        {value}
                    </Button>
                )}

                <Button
                    click={() => changePage(currentPage + 1)}
                    disabled={current === max}
                    icon={'caret-right'}
                    type={ButtonType.BLANK}
                />
            </>
        );
    }

    return(
        <>
            {currentPage > 0 &&
                <div className={'pagination-wrapper'}>
                    {generatePaginationBar(min, max, currentPage)}
                </div>
            }
        </>
    );

}

export default Pagination;