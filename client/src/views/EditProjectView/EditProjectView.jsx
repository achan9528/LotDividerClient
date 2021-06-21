import { Table, Button, Col, Row, Container, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import { editEntry, getEntry } from '../../components/helpers'

export const EditProjectView = (props) =>{
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState()
    const [successfulUpdate, setSuccessfulUpdate] = useState()
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState()
    const { projectID } = useParams()
    const { token } = useToken()

    useEffect(()=>{
        if (loading){
            getEntry('projects', projectID, setLoading, setProject, setMessages, token)
        } 
    }, [])

    let tableData;
    if (!project.proposals){
        tableData = 
            <tr>
                <td>No Proposals</td>
                <td></td>
                <td></td>
            </tr>
    } else {
        tableData = 
            project.proposals.map((item,key)=>{
                return (
                    <tr key={item.key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                )
            })
    }

    if (successfulUpdate){
        return <Redirect to="/dashboard"></Redirect>
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={e=>editEntry(e, 'projects', projectID, {name: projectName},setSuccessfulUpdate, setMessages, token)}>
                        <Form.Group>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                            value={projectName}
                            onChange={e=>setProjectName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData}
                                    </tbody>
                                </Table>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    variant="success"
                                    type="submit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default EditProjectView;