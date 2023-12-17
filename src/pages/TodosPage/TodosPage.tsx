import {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Table } from "../../components/UI/Table/Table.tsx";
import { getTodos } from "../../api/getTodos.ts";
import { Pagination } from "../../components/APP/Pagination/Pagination.tsx";
import { Dropdown } from "../../components/UI/Dropdown/Dropdown.tsx";
import { TodoItemType } from "../../@types/types.ts";
import { SearchInput } from "../../components/UI/SearchInput/SearchInput.tsx";

export const TodosPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [todos, setTodos] = useState<TodoItemType[]>([]);
    const [filters, setFilters] = useState({
        title: searchParams.get('title') ?? '',
        completed: searchParams.get('completed') ?? '',
        sortBy: searchParams.get('sortBy') ?? '',
        sortOrder: searchParams.get('sortOrder') ?? '',
    });
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);

    const todosQuantityPerPage = 15;
    const { data, isLoading, isError } = useQuery("todos", () => getTodos());

    useEffect(() => {
        data && setTodos(data);
    }, [data]);

    // TODO FILTRATION

    useEffect(() => {
        if (data) {
            const todosFilteredByTitle = data.filter((todo) => todo.title?.includes(filters.title));

            const todosFilteredByCompleted = todosFilteredByTitle.filter(todo => {
                if (filters.completed === 'true') return todo.completed;
                if (filters.completed === 'false') return !todo.completed;
                if (filters.completed === '') return todo;
            });
            const sortTodos = (todosArr: TodoItemType[], sortParam: string, orderParam: string) => {
                return todosArr.sort((a, b) => {
                    const aValue = sortParam === 'title' ? (a.title ?? '').length : a.id;
                    const bValue = sortParam === 'title' ? (b.title ?? '').length : b.id;

                    if (orderParam === 'ascending') {
                        return aValue - bValue;
                    } else if (orderParam === 'descending') {
                        return bValue - aValue;
                    } else {
                        return 0;
                    }
                });
            };
            const sortedTodos = sortTodos(todosFilteredByCompleted, filters.sortBy, filters.sortOrder);

            setTodos(sortedTodos);

            setSearchParams({
                page: String(currentPage),
                title: filters.title,
                completed: filters.completed,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            });

        }
    }, [data, filters, currentPage]);


    console.log(filters)

    const todosForSinglePage = todos.slice((currentPage-1)*todosQuantityPerPage, currentPage*todosQuantityPerPage);
    const totalPagesAmount = Math.ceil(todos.length/todosQuantityPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const handleFilterChange = (field: string, value:string) => {
        setFilters({ ...filters, [field]: value });
    };

    if (isLoading) return <h1>The page is loading...</h1>;
    if (isError) return <h1>An error occurred. Sorry</h1>;

    return (
        <section className="min-w-full">
            <h1 className="text-3xl font-bold mb-10">Todos Page</h1>
            <div className="flex justify-evenly items-center mb-16">
                <SearchInput
                    value={filters.title}
                    onChange={(e) => {
                        handleFilterChange('title', e.target.value);
                    }}
                />

                <Dropdown
                    onClick={handleFilterChange}
                    value='completed'
                    name="Completed"
                    firstOption="All"
                    secondOption="True"
                    thirdOption="False"
                />
                <Dropdown
                    onClick={handleFilterChange}
                    value='sortBy'
                    name="Sort By"
                    firstOption="Default"
                    secondOption="Id"
                    thirdOption="Title"
                />
                <Dropdown
                    value='sortOrder'
                    onClick={handleFilterChange}
                    name="Sort Order"
                    firstOption="Default"
                    secondOption="Ascending"
                    thirdOption="Descending"
                />
            </div>
            <Table
                className="flex justify-center"
                firstColumnName="Id"
                secondColumnName="UserId"
                thirdColumnName="Title"
                fourthColumnName="Completed"
                todos={todosForSinglePage}
            />
            <Pagination
                className="mt-6"
                currentPage={currentPage}
                totalPagesAmount={totalPagesAmount}
                handlePageClick={handlePageClick}
            />
        </section>
    );
};
