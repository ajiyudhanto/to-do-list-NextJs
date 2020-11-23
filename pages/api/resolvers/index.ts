import axios from 'axios'
import Redis from 'ioredis'
import { ToDo, ToDoFormInput } from '../../../interface'

const redis = new Redis()

export const resolvers = {
    Query: {
        toDos: async () => {
            try {
                const toDosCache: string | null = await redis.get('toDos')
                if (toDosCache !== null) {
                    return JSON.parse(toDosCache)
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: 'http://localhost:3000/todos'
                    })
                    await redis.set('toDos', JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        },

        toDoById: async (_, args) => {
            try {
                const toDosCache: string | null = await redis.get('toDos')
                if (toDosCache !== null) {
                    const toDos: ToDo[] = JSON.parse(toDosCache)
                    const id: number = Number(args.id)
                    const data: ToDo = toDos.find(e => e.id === id)
                    return data
                } else {
                    const { data } = await axios({
                        method: 'get',
                        url: 'http://localhost:3000/todos/' + args.id
                    })
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        createToDo: async (_, args) => {
            try {
                const { title, description, status, date } = args
                const payload: ToDoFormInput = { title, description, status, date }
                const { data } = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/todos',
                    data: payload
                })
                await redis.del('toDos')
                return data
            } catch (error) {
                console.log(error)
            }
        },

        updateToDo: async (_, args) => {
            try {
                const { id, title, description, status, date } = args
                const payload: ToDoFormInput = { title, description, status, date }
                const { data } = await axios({
                    method: 'put',
                    url: 'http://localhost:3000/todos/' + id,
                    data: payload
                })
                await redis.del('toDos')
                return data
            } catch (error) {
                console.log(error)
            }
        },

        deleteToDo: async (_, args) => {
            try {
                const { data } = await axios({
                    method: 'delete',
                    url: 'http://localhost:3000/todos/' + args.id
                })
                await redis.del('toDos')
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }
}