import {useCallback, useEffect, useMemo, useState} from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Table } from "../../components/UI/Table/Table.tsx";
import { getTodos } from "../../api/getTodos.ts";
import { Pagination } from "../../components/APP/Pagination/Pagination.tsx";
import { Dropdown } from "../../components/UI/Dropdown/Dropdown.tsx";
import { TodoItemType } from "../../@types/types.ts";
import { SearchInput } from "../../components/UI/SearchInput/SearchInput.tsx";
import {TodoItem} from "../../components/UI/TodoItem/TodoItem.tsx";

type filtersType = {
    title: string;
    completed: string;
    sortBy: string;
    sortOrder: string;
    [key: string]: string;
};

export const TodosPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<filtersType>({
        title: searchParams.get('title') ?? '',
        completed: searchParams.get('completed') ?? '',
        sortBy: searchParams.get('sortBy') ?? '',
        sortOrder: searchParams.get('sortOrder') ?? '',
    });
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);

    const todosQuantityPerPage = 15;
    const { data, isLoading, isError } = useQuery("todos", () => getTodos());

    const useFilteredTodos = (data: TodoItemType[] | undefined, filters: filtersType) => {
        return  useMemo(() => {
            if (data) {
                const todosFilteredByTitle = data.filter((todo) =>
                    todo.title?.includes(filters.title)
                );

                const todosFilteredByCompleted = todosFilteredByTitle.filter((todo) => {
                    if (filters.completed === "true") return todo.completed;
                    if (filters.completed === "false") return !todo.completed;
                    if (filters.completed === "") return todo;
                });

                return todosFilteredByCompleted.sort((a, b) => {
                    const aValue =
                        filters.sortBy === "title" ? (a.title ?? "").length : a.id;
                    const bValue =
                        filters.sortBy === "title" ? (b.title ?? "").length : b.id;

                    if (filters.sortOrder === "ascending") {
                        return aValue - bValue;
                    } else if (filters.sortOrder === "descending") {
                        return bValue - aValue;
                    } else {
                        return 0;
                    }
                });
            }
            return [];
        }, [data, filters]);
    };

    const filteredTodos = useFilteredTodos(data , filters)

    useEffect(() => {
        setCurrentPage(1)
    }, [filters]);

    useEffect(() => {
        const newSearchParams = Object.fromEntries(
            Object.entries({
                page: String(currentPage),
                title: filters.title,
                completed: filters.completed,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            }).filter(([_, value]) => value !== '')
        );

        setSearchParams(newSearchParams);

    }, [data, filters, setSearchParams, currentPage]);

    const todosForSinglePage = filteredTodos.slice((currentPage-1)*todosQuantityPerPage, currentPage*todosQuantityPerPage);
    const totalPagesAmount = Math.ceil(filteredTodos.length/todosQuantityPerPage);

    const handlePageClick = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber);
    },[setCurrentPage]);

    const handleFilterChange = useCallback((field: string, value:string) => {
        if (filters[field] === value) {
            setFilters({...filters, [field]: ''})
        } else {
            setFilters({ ...filters, [field]: value });
        }
    },[filters]);

    if (isLoading) return <h1>The page is loading...</h1>;
    if (isError) return <h1>An error occurred. Sorry</h1>;

    return (
        <section className="w-[100%] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-10">Todos Page</h1>
            <div className="w-full flex justify-between items-center mb-16">
                <SearchInput
                    placeholder='Search'
                    value={filters.title}
                    onChange={(e) => {
                        handleFilterChange('title', e.target.value);
                    }}
                />

                <Dropdown
                    onClick={handleFilterChange}
                    value='completed'
                    name="Completed"
                    options={['True', 'False']}
                />
                <Dropdown
                    onClick={handleFilterChange}
                    value='sortBy'
                    name='Sort By'
                    options={['Id', 'Title']}
                />
                <Dropdown
                    value='sortOrder'
                    onClick={handleFilterChange}
                    name="Order"
                    options={['Ascending', 'Descending']}
                />
            </div>
            <Table
                headers={['Id', 'UserId', 'Title', 'Completed']}
                data={todosForSinglePage}
                renderRow={(todo) => {
                    return <TodoItem key={todo.id} id={todo.id} userId={todo.userId} title={todo.title} completed={todo.completed} />
                }}
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



