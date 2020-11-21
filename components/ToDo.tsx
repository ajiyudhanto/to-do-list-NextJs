import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { MdCheck } from "react-icons/md";

export default function ToDo(props) {
    let date: any = new Date(props.toDo.date)
    date = date.toUTCString().split(' ')
    date = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`

    return (
        <>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#FFBF26', color: '#1D1F21' }}
                contentArrowStyle={{ borderRight: '7px solid  #FFBF26' }}
                date={ date }
                iconStyle={{ background: '#D4EDDA', color: '#275824' }}
                icon={<MdCheck />}
            >
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