import { Table, Button, Col, Row, Container, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

export const EditProjectView = (props) =>{
    const [project, setProject] = useState({})
    const [projectName, setProjectName] = useState()
    const [projectUpdated, setProjectUpdated] = useState()
    const [messages, setMessages] = useState()
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
        .then(data => {
            setProject(data)
            setProjectName(data.name)
        })
        .catch(err => console.log(err));
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        const url = `http://localhost:8000/api/projects/${projectID}/`
        const data = {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName
            })
        }
        fetch(url, data)
        .then(res => {
            if (res.status == 200 || res.status == 204){
                setProjectUpdated(true)
            } else {
                setMessages({...res.json()})
            }
        })
        .catch(err => console.log(err));
    }

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

    if (projectUpdated){
        return <Redirect to="/dashboard"></Redirect>
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={e=>submitHandler(e)}>
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