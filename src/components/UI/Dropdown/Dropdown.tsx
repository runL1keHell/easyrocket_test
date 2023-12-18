import React from "react";

type DropdownProps = {
    name: string;
    options: string[];
    value: string;
    onClick: (value: string, option: string) => void;
};

export const Dropdown = React.memo(({ name, options, value, onClick }: DropdownProps) => {
    console.log('DROPDOWN RENDERED')
    return (
        <div className="dropdown dropdown-bottom dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">{name}</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box flex items-center min-w-full">
                {options.map((option, index) => (
                    <li key={index} value={value} onClick={() => onClick(value, option.toLowerCase())} className=''>
                        <a>{option}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
});