import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client' 
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { MdCheck, MdMoreHoriz, MdClose } from "react-icons/md";

const UPDATE_TODO = gql`
    mutation UpdateToDo($id: Int, $title: String, $description: String, $status: Boolean, $date: String) {
        updateToDo(id: $id, title: $title, description: $description, status: $status, date: $date) {
            msg
        }
    }
`

const DELETE_TODO = gql`
    mutation DeleteToDo($id: Int) {
        deleteToDo(id: $id) {
            msg
        }
    }
`

export default function ToDo(props) {
    const [updateToDo] = useMutation(UPDATE_TODO)
    const [deleteToDo] = useMutation(DELETE_TODO)
    let date: any = new Date(props.toDo.date)
    date = date.toUTCString().split(' ')
    date = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`

    async function updateHandler() {
        let newToDo = { ...props.toDo, status: !props.toDo.status }
        delete newToDo.__typename
        newToDo.id = Number(newToDo.id)
        const result = await updateToDo({ variables: newToDo })
        props.refetch()
    }

    async function deleteHandler() {
        const result = await deleteToDo({ variables: { id: Number(props.toDo.id) } })
        props.refetch()
    }

    return (
        <>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#FFBF26', color: '#1D1F21' }}
                contentArrowStyle={{ borderRight: '7px solid  #FFBF26' }}
                date={ date }
                iconStyle={ props.toDo.status === true? { background: '#D4EDDA', color: '#275824', cursor: 'pointer' } : { background: '#E2E3E5', color: '#383D41', cursor: 'pointer' } }
                iconOnClick={ () => updateHandler() }
                icon={ props.toDo.status === true? <MdCheck /> : <MdMoreHoriz /> }
            >
                <MdClose onClick={ () => deleteHandler() } style={{ position: 'absolute', left: '95%', fontSize: '20px', cursor: 'pointer' }} />
                <h3 className="vertical-timeline-element-title">{ props.toDo.title }</h3>
                <p>{ props.toDo.description }</p>
            </VerticalTimelineElement>
            {/* <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{ props.toDo.title }</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{ date }</Card.Subtitle>
                            <Card.Text>{ props.toDo.description }</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
        </>
    )
}