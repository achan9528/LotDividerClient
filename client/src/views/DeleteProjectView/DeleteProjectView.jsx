import { Table, Button, Col, Row, Container } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import { 
    getEntry,
    deleteEntry,
} from '../../components/helpers'

export const DeleteProjectView = (props) =>{
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const [messages, setMessages] = useState({})
    const { projectID } = useParams()
    const { token } = useToken()

    useEffect(()=>{
        getEntry('projects', projectID, setLoading, setProject, setMessages, token)
    }, [projectID, token])

    let tableData;
    if (!project.proposals){
        tableData = 
            <tr>
                <td>No Proposals</td>
                <td></td>
            </tr>
    } else {
        tableData = 
            project.proposals.map((item,key)=>{
                return (
                    <tr key={item.key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <Row>
                                <Col>
                                    <Link 
                                    to={`/proposals/${item.projectID}`}>View</Link>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                )
            })
    }

    if (deleted){
        return <Redirect to="/dashboard"></Redirect>
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Are you sure you want to delete Project "{project.name}"?</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                    <Button 
                    variant="danger"
                    onClick={e=>deleteEntry(e, 'projects', projectID, setDeleted, setMessages, token)}>Delete Project</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default DeleteProjectView;