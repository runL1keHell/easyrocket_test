import {TodoItemType} from "../../../@types/types.ts";

export const TodoItem = ({id, userId, title, completed}: TodoItemType) => {
    return (
        <tr className=' hover:bg-base-200'>
            <td>{id}</td>
            <td>{userId}</td>
            <td>{title}</td>
            <td>{String(completed)}</td>
        </tr>
    )
}