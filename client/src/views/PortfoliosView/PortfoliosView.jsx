import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries, getEntry, getGenericUserInfo } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'

export const PortfoliosView = (props) => {
    const { token } = useToken()
    const [ portfolios, setPortfolios ] = useState([])
    const [loading, setLoading] = useState(true)
    const [ messages, setMessages ] = useState()
    const [pages, setPages] = useState()

    useEffect(() => {
        if (loading) {
            getEntries('portfolios', setPortfolios, setPages, setLoading, setMessages, token, {});
        }
    }, [])

    let tableData;
    if (portfolios.length === 0){
        tableData = <tr><td>No projects</td><td></td></tr>
    } else {
        tableData = portfolios.map((item,key) => {
            return(
                <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <Link to={'/portfolios/'+item.id+"/"}>View | </Link>
                        <Link to={'/portfolios/'+item.id+"/edit"}>Edit Portfolio | </Link>
                        <Link to={'/portfolios/'+item.id+"/delete"}>Remove Portfolio</Link>
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
                        <h1>Portfolios</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Portfolio ID</th>
                                    <th>Portfolio Name</th>
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