import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function ToDo(props) {

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{ props.toDo.title }</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{ props.toDo.date }</Card.Subtitle>
                            <Card.Text>{ props.toDo.description }</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}