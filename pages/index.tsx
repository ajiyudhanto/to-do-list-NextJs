import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Row, Col } from 'react-bootstrap'
import ToDoForm from '../components/ToDoForm'

export default function Home() {
  return (
    <div>
      <Row>
        <Col xs={4}>
          <ToDoForm />
        </Col>
        <Col>
          <h1>INI LIST</h1>
        </Col>
      </Row>
    </div>
  )
}
