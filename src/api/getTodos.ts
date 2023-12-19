import axios, {AxiosResponse} from "axios";
import {TodoItemType} from "../@types/types.ts";

export const getTodos = async (): Promise<TodoItemType[] | undefined> => {
    try {
        const response: AxiosResponse<TodoItemType[]> = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return response.data;
    } catch (e) {
        console.log(e);
        return;
    }
}

