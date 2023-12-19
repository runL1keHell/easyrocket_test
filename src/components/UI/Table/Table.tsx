import {TodoItemType} from "../../../@types/types.ts";
import React from "react";

export type TableType = {
    className?: string;
    headers: string[];
    data: TodoItemType[];
    renderRow: (item: TodoItemType) => React.ReactElement;
    columnsWidth: string[];
}
export const Table = React.memo(({ className, headers, data, renderRow, columnsWidth }: TableType) => {
    return (
        <table className={`table-fixed table table-lg ${className ?? ''}`}>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index} className={columnsWidth[index]}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data && data.map(renderRow)}
            </tbody>
        </table>
    )
})