import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../components/hooks/useToken'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
    const { token, setToken } = useToken()
    const [ projects, setProjects ] = useState([])

    useEffect(() => {
        const url = 'http://localhost:8000/api/projects/';
        const data = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
        fetch(url, data)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProjects(data);
        }).catch(err => {
            return err;
        })
    }, [])

    let tableData;
    if (projects.length == 0){
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