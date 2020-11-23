export interface ToDoFormInput {
    title: string
    description: string
    status: boolean
    date: string
}

export interface ToDo extends ToDoFormInput {
    id: number
}

export interface ToDoFromQuery extends ToDoFormInput {
    __typename: string
    id: string
}