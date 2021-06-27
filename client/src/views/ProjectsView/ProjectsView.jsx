import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries, getEntry, getGenericUserInfo } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'
import { SearchBox } from '../../components/SearchBox/SearchBox'

export const ProjectsView = (props) => {
    const { token } = useToken()
    const [ projects, setProjects ] = useState([])
    const [loading, setLoading] = useState(true)
    const [ messages, setMessages ] = useState()
    const [pages, setPages] = useState()

    useEffect(() => {
        if (loading) {
            getEntries('projects', setProjects, setPages, setLoading, setMessages, token);
        }
    }, [])

    let tableData;
    if (projects.length === 0 || projects.length === undefined){
        tableData = <tr>
                        <td>No projects</td>
                        <td></td>
                    </tr>
    } else {
        console.log(projects);
        tableData = projects.map((item,key) => {
            return(
                <tr key={key}>
                    <td>{item.id}</td>
                    <td><Link to={'/projects/'+item.id+"/"}>{item.name}</Link></td>
                    <td>
                        <Link to={'/projects/'+item.id+"/edit/"}>Edit Project | </Link>
                        <Link to={'/projects/'+item.id+"/delete/"}>Remove Project</Link>
                    </td>
                </tr>
            )
        })
    }

    if (loading){
        return <Loading></Loading>
    } else {
        return (
            <Container className="justify-content-md-center">
                <Row>
                    <Col>
                        <h1>Projects</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchBox 
                        model={'projects'}
                        setEntries={setProjects}
                        setLoading={setLoading}
                        setMessages={setMessages}
                        setPages={setPages}
                        token={token}></SearchBox>
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
                    </Col>
                    {/* <Col>
                        <h2>Latest Activity:</h2>
                        <p>Go Go Squid is a good show (deep cuts)</p>
                    </Col> */}
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Row>
                            <Col className="justify-content-md-center">
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <Link to='/dashboard'>
                                            Back to Dashboard
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <Link to='/projects/new'>
                                            <Button variant="success">New Project</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}