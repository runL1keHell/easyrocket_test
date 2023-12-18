import {TodoItemType} from "../../../@types/types.ts";
import React from "react";

export type TableType = {
    className?: string;
    headers: string[];
    data: TodoItemType[];
    renderRow: (item: TodoItemType) => React.ReactElement;
}
export const Table = React.memo(({ className, headers, data, renderRow }: TableType) => {
    return (
        <table className={`w-full table table-lg transition-opacity duration-300 ease-in-out ${data ? 'opacity-100' : 'opacity-0'}  ${className ?? ''}`}>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} className={``}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data && data.map(renderRow)}
            </tbody>
        </table>
    )
})