import React, { useState }from 'react'
import { getEntries } from '../helpers'
import { Accordion, Card, Form, Button, Col } from 'react-bootstrap'


export const SearchBox = (props) => {
    const [proposalID, setProposalID] = useState();
    const [proposalName, setProposalName] = useState();
    const [accountID, setAccountID] = useState();
    const [accountName, setAccountName] = useState();
    const [projectID, setProjectID] = useState();
    const [projectName, setProjectName] = useState();
    const [portfolioID, setPortfolioID] = useState();
    const [portfolioName, setPortfolioName] = useState();

    return(
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Show / Hide Search Filters
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Proposal ID</Form.Label>
                                    <Form.Control 
                                    onChange={e=>setProposalID(e.target.value)}
                                    value={proposalID}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Proposal Name</Form.Label>
                                    <Form.Control
                                    onChange={e=>setProposalName(e.target.value)}
                                    value={proposalName}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Project ID</Form.Label>
                                    <Form.Control
                                    onChange={e=>setProjectID(e.target.value)}
                                    value={projectID}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                    onChange={e=>setProjectName(e.target.value)}
                                    value={projectName}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Portfolio Number</Form.Label>
                                    <Form.Control
                                    onChange={e=>setPortfolioID(e.target.value)}
                                    value={portfolioID}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Portfolio Name</Form.Label>
                                    <Form.Control
                                    onChange={e=>setPortfolioName(e.target.value)}
                                    value={portfolioName}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control 
                                    onChange={e=>setAccountID(e.target.value)}
                                    value={accountID}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Account Name</Form.Label>
                                    <Form.Control
                                    onChange={e=>setAccountName(e.target.value)}
                                    value={accountName}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col className="d-flex justify-content-end">
                                    <Button onClick={e=>
                                    getEntries(
                                        props.model,
                                        props.setEntries,
                                        props.setPages,
                                        props.setLoading,
                                        props.setMessages,
                                        props.token,
                                        {
                                            projectID: projectID,
                                            projectName: projectName,
                                            proposalID: proposalID,
                                            proposalName: proposalName,
                                            accountID: accountID,
                                            accountName: accountName,
                                            portfolioID: portfolioID,
                                            portfolioName: portfolioName
                                        })
                                        }>Apply</Button>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button onClick={e=>{
                                    setProposalID();
                                    setProposalName();
                                    setProjectID();
                                    setProjectName();
                                    setAccountID();
                                    setAccountName();
                                    setPortfolioID();
                                    setPortfolioName();
                                    getEntries(                                    props.model,
                                        props.setEntries,
                                        props.setPages,
                                        props.setLoading,
                                        props.setMessages,
                                        props.token,
                                    );
                                    }}>Clear Filters</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}