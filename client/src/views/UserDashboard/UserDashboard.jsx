import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries } from '../../components/helpers'

const UserDashboard = (props) => {
    const { token } = useToken()
    const [ projects, setProjects ] = useState([])
    const [loading, setLoading] = useState(true)
    const [ messages, setMessages ] = useState()

    useEffect(() => {
        loading
        ? getEntries('projects', setProjects, setLoading, setMessages, token)
        : setLoading(false)
    }, [])

    let tableData;
    if (projects.length === 0){
        tableData = <tr><td>No projects</td><td></td></tr>
    } else {
        tableData = projects.map((item,key) => {
            return(
                <tr key={key}>
                    <td>{item.id}</td>
                    <td><Link to={'/projects/'+item.id+"/"}>{item.name}</Link></td>
                    <td>
                        <Link to={'/projects/'+item.id+"/edit"}>Edit Project | </Link>
                        <Link to={'/projects/'+item.id+"/delete"}>Remove Project</Link>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Welcome back!</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Project ID</th>
                                <th>Project Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                    <Link to='/projects/new'>
                        <Button>New Project</Button>
                    </Link>
                    <Link to='/portfolios/new'>
                        <Button>New Portfolio</Button>
                    </Link>
                </Col>
                <Col>
                    <h2>Latest Activity:</h2>
                    <p>Go Go Squid is a good show (deep cuts)</p>
                </Col>
            </Row>
        </Container>
    )
}

export default UserDashboard;