export type DropdownProps = {
    name: string;
    firstOption: string;
    secondOption: string;
    thirdOption: string;
    value: string;
    onClick: (name: string, option: string) => void;
}

export const Dropdown = ({name, firstOption, secondOption, thirdOption, value, onClick}: DropdownProps) => {
    return (
    <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">{name}</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li value={value} onClick={() => onClick(value, '')}><a>{firstOption}</a></li>
            <li value={value} onClick={() => onClick(value, secondOption.toLowerCase())}><a>{secondOption}</a></li>
            <li value={value} onClick={() => onClick(value, thirdOption.toLowerCase())}><a>{thirdOption}</a></li>
        </ul>
    </div>
    )
}