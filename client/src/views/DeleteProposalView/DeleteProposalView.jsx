import { Button, Col, Row, Container, Accordion } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import ProposalViewOuterCard from '../../components/ProposalViewOuterCard/ProposalViewOuterCard'
import {
    getEntry,
    deleteEntry, 
    getProposalSections
} from '../../components/helpers'

export const DeleteProposalView = (props) =>{
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState()
    const [accounts, setAccounts] = useState([])
    const [holdings, setHoldings] = useState({})
    const [deleted, setDeleted] = useState(false)
    const [message, setMessages] = useState()
    const { projectID, proposalID } = useParams()
    const { token } = useToken()

    useEffect(()=>{
        if (loading){
            getEntry('proposals', proposalID, setLoading, setProposal, setMessages, token);
        } else {
            getProposalSections(proposal, setHoldings, setAccounts)
        }
    }, [loading])

    const productTypes = {
        stocks: 'Stocks',
        mutualFunds: 'Mutual Funds',
        bonds: 'Bonds',
        etfs: 'ETFs'
    }

    if (deleted) {
        return (
            <Redirect to="/dashboard"></Redirect>
        )
    }

    if (!loading){
        return (
            <Container>
                <h2>Are you sure you want to delete the following proposal?</h2>
                <Row>
                    <Col>
                        <h2>{proposal.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                            {
                                Object.keys(holdings).map((item,key)=>{
                                    return(
                                        <Accordion>
                                            <ProposalViewOuterCard
                                            heading={productTypes[[item]]}
                                            eventKey={`${key}`}
                                            key={key}
                                            accounts={accounts}
                                            holdings={holdings[[item]]}></ProposalViewOuterCard>
                                        </Accordion>
                                    )
                                })
                            }

                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Link to={`/projects/${projectID}`}>Back to Project</Link>
                    </Col>
                    <Col>
                        <Link to={`/dashboard`}>Back to Dashboard</Link>
                    </Col>
                    <Col>
                        <Button 
                        variant="danger"
                        onClick={e=>{deleteEntry(e, 'proposals', proposalID, setDeleted, setMessages, token)}}>Delete</Button>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <div>
                <h1>Loading Proposal...</h1>
            </div>
        )
    }
    
}

export default DeleteProposalView;