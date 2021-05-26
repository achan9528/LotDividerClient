import { Table, Button, Col, Row, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

export const DeleteProjectView = (props) =>{
    const [project, setProject] = useState({})
    const [projectDeleted, setProjectDeleted] = useState(false)
    const [messages, setMessages] = useState({})
    const { projectID } = useParams()
    const { token } = useToken()

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
    }, [projectID, token])

    const deleteProject = (e) => {
        const url = `http://localhost:8000/api/projects/${projectID}/`
        const data = {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res => {
            console.log(res)
            if (res.status === 204){
                setProjectDeleted(true)
            } else {
                setMessages({...res.json()})
            }
        })
        .catch(err => console.log(err));
    }


    let tableData;
    console.log(project);
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

    if (projectDeleted){
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
                    onClick={e=>deleteProject(e)}>Delete Project</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default DeleteProjectView;