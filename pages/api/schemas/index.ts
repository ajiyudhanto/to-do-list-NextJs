import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type ToDo {
        id: ID
        title: String
        description: String
        status: Boolean
        date: String
    }

    type Status {
        msg: String
    }

    type Query {
        toDos: [ToDo]
        toDoById(id: String): ToDo
    }

    type Mutation {
        createToDo(title: String, description: String, status: Boolean, date: String): ToDo
        updateToDo(id: Int, title: String, description: String, status: Boolean, date: String): Status
        deleteToDo(id: Int): Status
    }
`