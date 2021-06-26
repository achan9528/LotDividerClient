import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries, getEntry, getGenericUserInfo } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'

const UserDashboard = (props) => {
    const { token } = useToken()
    const [ projects, setProjects ] = useState([])
    const [loading, setLoading] = useState(true)
    const [ messages, setMessages ] = useState()
    const [userInfo, setUserInfo] = useState()
    const [pages, setPages] = useState()

    useEffect(() => {
        if (loading) {
            getGenericUserInfo(token, setUserInfo);
            getEntries('projects', setProjects, setPages, setLoading, setMessages, token, {userSpecific: true});
        }
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

    if (loading){
        return <Loading></Loading>
    } else {
        return (
            <Container className="justify-content-md-center">
                <Row>
                    <Col>
                        <h1>Hello {userInfo.username}!</h1>
                        <h4>Here's a list of your projects</h4>
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
                    </Col>
                    {/* <Col>
                        <h2>Latest Activity:</h2>
                        <p>Go Go Squid is a good show (deep cuts)</p>
                    </Col> */}
                </Row>
            </Container>
        )
    }
}

export default UserDashboard;