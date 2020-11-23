import React from 'react'
import { useMutation, gql } from '@apollo/client' 
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { MdCheck, MdMoreHoriz, MdClose } from "react-icons/md";
import { ToDoFromQuery } from '../interface'

const UPDATE_TODO = gql`
    mutation UpdateToDo($id: String, $title: String, $description: String, $status: Boolean, $date: String) {
        updateToDo(id: $id, title: $title, description: $description, status: $status, date: $date) {
            msg
        }
    }
`

const DELETE_TODO = gql`
    mutation DeleteToDo($id: String) {
        deleteToDo(id: $id) {
            msg
        }
    }
`

export default function ToDo(props) {
    const [updateToDo] = useMutation(UPDATE_TODO)
    const [deleteToDo] = useMutation(DELETE_TODO)
    const toDoDate: string[] = new Date(props.toDo.date).toUTCString().split(' ')
    const date: string = `${toDoDate[0]} ${toDoDate[1]} ${toDoDate[2]} ${toDoDate[3]}`

    async function updateHandler() {
        let newToDo: ToDoFromQuery = { ...props.toDo, status: !props.toDo.status }
        delete newToDo.__typename
        const result = await updateToDo({ variables: newToDo })
        props.refetch()
    }

    async function deleteHandler() {
        const result = await deleteToDo({ variables: { id: props.toDo.id } })
        props.refetch()
    }

    return (
        <>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#282828', color: '#eaeaea' }}
                contentArrowStyle={{ borderRight: '7px solid  #282828' }}
                iconStyle={ props.toDo.status === true? { background: '#3C8258', color: '#eaeaea', cursor: 'pointer' } : { background: '#181818', color: '#eaeaea', cursor: 'pointer' } }
                iconOnClick={ () => updateHandler() }
                icon={ props.toDo.status === true? <MdCheck /> : <MdMoreHoriz /> }
            >
                <MdClose onClick={ () => deleteHandler() } style={{ position: 'absolute', left: '95%', fontSize: '20px', cursor: 'pointer' }} />
                <h3 style={{ fontWeight: 'bolder' }}>{ props.toDo.title }</h3>
                <p style={{ fontStyle: 'italic' }}>{ date }</p>
                <p>{ props.toDo.description }</p>
            </VerticalTimelineElement>
        </>
    )
}