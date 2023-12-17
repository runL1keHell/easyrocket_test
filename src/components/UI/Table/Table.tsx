import {TodoItem} from "../TodoItem/TodoItem.tsx";
import {TodoItemType} from "../../../@types/types.ts";

export type TableType = {
    className?: string;
    firstColumnName: string;
    secondColumnName?: string;
    thirdColumnName?: string;
    fourthColumnName?: string;
    todos: TodoItemType[];
}
export const Table = ({className, firstColumnName, secondColumnName, thirdColumnName, fourthColumnName, todos }: TableType) => {

    return (
        <table className={`w-full table table-lg flex justify-center  ${className}`}>
            <thead>
            <tr>
                <th>{firstColumnName}</th>
                <th>{secondColumnName}</th>
                <th>{thirdColumnName}</th>
                <th>{fourthColumnName}</th>
            </tr>
            </thead>
            <tbody>
            {todos && todos.map((todo) => {
                return <TodoItem key={todo.id} id={todo.id} userId={todo.userId} title={todo.title} completed={todo.completed} />
            })}
            </tbody>
        </table>
    )
}