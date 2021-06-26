import React, { useState }from 'react'
import { getEntries } from '../helpers'
import { Accordion, Card, Form, Button, Col } from 'react-bootstrap'


export const SearchBox = (props) => {
    const [proposalID, setProposalID] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [searchParams, setSearchParams] = useState()

    return(
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Show Search Filters
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Proposal ID</Form.Label>
                                    <Form.Control placeholder="Proposal ID" 
                                    onChange={e=>setProposalID(e.target.value)}
                                    value={proposalID}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control placeholder="Account Number" 
                                    onChange={e=>setAccountNumber(e.target.value)}
                                    value={accountNumber}/>
                                </Form.Group>
                            </Form.Row>
                            <Button onClick={e=>
                                getEntries('projects',
                                    props.setProjects,
                                    props.setPages,
                                    props.setLoading,
                                    props.setMessages,
                                    props.token,
                                    {
                                        id: proposalID,
                                        accountUsed: accountNumber
                                    })
                            }>Apply</Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}