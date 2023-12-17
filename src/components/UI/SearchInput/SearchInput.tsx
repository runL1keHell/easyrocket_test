import {InputHTMLAttributes} from "react";

export const SearchInput = ({...inputProps}:InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input {...inputProps} type="text" placeholder="Type here" className="input w-full max-w-xs" />
    )
}