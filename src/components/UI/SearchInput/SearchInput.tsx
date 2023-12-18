import {InputHTMLAttributes} from "react";

export const SearchInput = ({...inputProps}:InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input {...inputProps} type="text" className="input input-bordered w-full max-w-xs" />
    )
}