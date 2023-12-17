import {ButtonHTMLAttributes} from "react";

type PaginationButtonProps = {
    name: string;
    className: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const PaginationButton = ({name, className, ...buttonProps}: PaginationButtonProps) => {
    return (
        <button
            className={`join-item btn btn-md ${className}`}
            {...buttonProps}
        >
            {name}
        </button>
    )
}