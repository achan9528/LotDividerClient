import { Row, Col, Table, Button, Container } from 'react-bootstrap'
import useToken from '../../components/hooks/useToken'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntries } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'
import { SearchBox } from '../../components/SearchBox/SearchBox'

export const ProposalsView = (props) => {
    const { token } = useToken()
    const [ proposals, setProposals ] = useState([])
    const [loading, setLoading] = useState(true)
    const [ messages, setMessages ] = useState()
    const [pages, setPages] = useState()

    useEffect(() => {
        if (loading) {
            getEntries('proposals', setProposals, setPages, setLoading, setMessages, token, {});
        }
    }, [])

    let tableData;
    if (proposals.length === 0){
        tableData = <tr>
                <td>No Proposals</td>
                <td></td>
                <td></td>
            </tr>
    } else {
        tableData = proposals.map((item,key) => {
            return(
                <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <Link to={'/proposals/'+item.id+"/"}>View</Link>
                        {/* <Link to={'/projects/'+item.id+"/edit"}>Edit Proposals | </Link> */}
                        {/* <Link to={'/projects/'+item.id+"/delete"}>Remove Proposals</Link> */}
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
                        <h1>Proposals</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchBox 
                            model={'proposals'}
                            setEntries={setProposals}
                            setLoading={setLoading}
                            setMessages={setMessages}
                            setPages={setPages}
                            token={token}></SearchBox>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Proposal ID</th>
                                    <th>Proposal Name</th>
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