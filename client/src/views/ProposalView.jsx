import { Table, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

export const ProposalView = (props) =>{
    const [proposal, setProposal] = useState({})
    const { id } = useParams()
    const { token, setToken } = useToken()

    useEffect(()=>{
        const url = `http://localhost:8000/api/proposals/${id}/`
        const data = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res => res.json())
        .then(data => setProposal(data))
        .catch(err => console.log(err));
    }, [])
    console.log(proposal)
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{proposal.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col>
                                        <Accordion.Toggle
                                        as={Button} variant={"link"} eventKey={"0"}>
                                        Equities
                                        </Accordion.Toggle>
                                    </Col>
                                    <Col>
                                        <h6>Total</h6>
                                    </Col>
                                    <Col>
                                        <h6>Another Total</h6>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey={"0"}>
                                {/* <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Ticker</th>
                                                <th>CUSIP</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body> */}
                                <Card.Body>
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                as={Button} variant={"link"} eventKey={"0"}>
                                                    Holding 1
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={"0"}>
                                                <Card.Body>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Ticker</th>
                                                                <th>CUSIP</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                as={Button} variant={"link"} eventKey={"1"}>
                                                    Holding 2
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={"1"}>
                                                <Card.Body>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Ticker</th>
                                                                <th>CUSIP</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Link to={`proposals/${id}/edit`}>Edit Proposal</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ProposalView;