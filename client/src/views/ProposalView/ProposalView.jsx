import { Col, Row, Container, Accordion, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import { ProposalViewOuterCard } from '../../components/ProposalViewOuterCard/ProposalViewOuterCard'
import { DownloadProposalModal } from '../../components/DownloadProposalModal/DownloadProposalModal'
import { 
    getEntry, 
    getProposalSections,
    downloadProposalModal
} from '../../components/helpers';
import {Loading} from '../../components/Loading/Loading'

export const ProposalView = (props) =>{
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState()
    const [accounts, setAccounts] = useState([])
    const [messages, setMessages] = useState()
    const [holdings, setHoldings] = useState({})
    const [show, setShow] = useState(false)
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
        etfs: 'Exchange Traded Funds (ETF)',
        cash: 'Cash'
    }

    if (loading){
        return <Loading></Loading>
    } else {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{proposal.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <DownloadProposalModal 
                    show={show} 
                    setShow={setShow}
                    proposalID={proposalID}></DownloadProposalModal>
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
                    <Col>
                        <Button onClick={e=> setShow(true)}>Download</Button> 
                    </Col>
                </Row>
            </Container>
        )
    }
}