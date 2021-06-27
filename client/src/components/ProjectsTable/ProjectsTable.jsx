import { Row, Col, Table, Button, Container, Form } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries, getEntry, getGenericUserInfo } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'
import { SearchBox } from '../../components/SearchBox/SearchBox'

export const ProjectsTable = (props) => {
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
                    <td>{item.name}</td>
                    <td>
                        <Form.Check 
                        name="selectedProject" 
                        type="radio"
                        onClick={e=>{
                            props.setSelectedProject(item.id)
                            props.setSelectedProjectName(item.name)
                        }}></Form.Check>
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
                </Row>
            </Container>
        )
    }
}