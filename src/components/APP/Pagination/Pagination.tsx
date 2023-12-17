import {useMemo} from "react";
import {PaginationButton} from "../../UI/PaginationButton/PaginationButton.tsx";

type PaginationPropsType = {
    currentPage: number;
    totalPagesAmount: number;
    className?: string;
    handlePageClick(pageNum:number) : void;
}

export const Pagination = ({currentPage, totalPagesAmount, className, handlePageClick}: PaginationPropsType) => {

    const createArrByLimit = (limit: number): number[] => {
        return Array.from({length: limit}, (_,i) => ++i);
    };


    const arrOfPages = useMemo(
        () => createArrByLimit(totalPagesAmount),
        [totalPagesAmount]
    );

    return (
        <div className={`${className}`}>
            <PaginationButton
                name="«"
                className={`${currentPage === 1 ? 'btn-disabled' : ''}`}
                onClick={() => handlePageClick(--currentPage)}
            />
            {arrOfPages.map((page) => {
                if (page){
                    return (
                        <PaginationButton
                            key={page}
                            name={String(page)}
                            className={`${page === currentPage ? 'btn-active' : ''}`}
                            onClick={() => {
                                handlePageClick(page);
                            }}
                        />
                    )
                }
            })}
            <PaginationButton
                name="»"
                className={`${currentPage === totalPagesAmount ? 'btn-disabled' : ''}`}
                onClick={() => handlePageClick(++currentPage)}
            />
        </div>
    )
}