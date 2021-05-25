import { Table, Button, Col, Row, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

export const ProjectView = (props) =>{
    const [project, setProject] = useState({})
    const { projectID } = useParams()
    const { token, setToken } = useToken()

    useEffect(()=>{
        const url = `http://localhost:8000/api/projects/${projectID}/`
        const data = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res => res.json())
        .then(data => setProject(data))
        .catch(err => console.log(err));
    }, [])
    let tableData;
    console.log(project);
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
                        <td>
                            <Row>
                                <Col>
                                    <Link 
                                    to={`/projects/${projectID}/proposals/${item.id}`}>View</Link>
                                </Col>
                                <Col>
                                    <Link
                                    to={`/projects/${projectID}/proposals/${item.id}/edit`}>Edit</Link>
                                </Col>
                                <Col>
                                    <Link
                                    to={`/projects/${projectID}/proposals/${item.id}/delete`}>Delete</Link>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                )
            })
    }

    return (
        <Container>
            <Row>
                <h2>Proposals in Project "{project.name}"</h2>
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
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/dashboard`}>Back to Dashboard</Link>
                </Col>
                <Col>
                    <Link to={`/projects/${projectID}/proposals/new`}>  
                        <Button>New Proposal</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectView;