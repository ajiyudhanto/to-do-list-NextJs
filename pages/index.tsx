import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Row, Col } from 'react-bootstrap'
import ToDoForm from '../components/ToDoForm'
import withApollo from '../lib/apollo'
import { useQuery, gql } from '@apollo/client'
import ToDo from '../components/ToDo'

const GET_TODOS = gql`
    query getToDos {
        toDos {
            id
            title
            description
            status
            date
        }
    }
`

const Home = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS)

  useEffect(() => {
    refetch()
  }, [])

  if (loading) return <p>loading...</p>
  if (error) return <p>{ JSON.stringify(error) }</p>

  return (
    <>
      <Row className={styles.container}>
        <Col xs={4}>
          <ToDoForm refetch={ refetch } />
        </Col>
        <Col>
          {
            data.toDos.map(toDo => {
                return <ToDo toDo={ toDo } key={ toDo.id } />
            })
          }
        </Col>
      </Row>
    </>
  )
}

export default withApollo({ ssr: true })(Home)