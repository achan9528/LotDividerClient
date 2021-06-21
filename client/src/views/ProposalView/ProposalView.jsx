import { Col, Row, Container, Accordion } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import { ProposalViewOuterCard } from '../../components/ProposalViewOuterCard/ProposalViewOuterCard'
import { getEntry, getProposalSections } from '../../components/helpers';

export const ProposalView = (props) =>{
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState()
    const [accounts, setAccounts] = useState([])
    const [messages, setMessages] = useState()
    const [holdings, setHoldings] = useState({})
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
        etfs: 'Etfs',
    }

    if (!loading){
        return (
            <Container>
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
                                        <Accordion key={key}>
                                            <ProposalViewOuterCard
                                            heading={productTypes[[item]]}
                                            eventKey={`${key}`}
                                            accounts={accounts}
                                            holdings={holdings[[item]]}></ProposalViewOuterCard>
                                        </Accordion>
                                    )
                                })
                            }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={`/dashboard`}>Back to Dashboard</Link>
                    </Col>
                    <Col>
                        <Link to={`/projects/${projectID}`}>Back to Project</Link>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        console.log(proposal)
        return (
            <div>
                <h1>Loading Proposal...</h1>
            </div>
        )
    }
    
}