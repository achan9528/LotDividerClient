import { Form, Button, Col, Row, Container, Accordion } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../../components/hooks/useToken'
import EditProposalViewOuterCard from '../../components/EditProposalViewOuterCard/EditProposalViewOuterCard'
import {
    getEntry,
    getProposalSections,
    batchEdit,
    draftTaxLotChangeHandler
} from '../../components/helpers'
import {Loading} from '../../components/Loading/Loading'

export const EditProposalView = (props) =>{
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState()
    const [accounts, setAccounts] = useState([])
    const [holdings, setHoldings] = useState({})
    const [messages, setMessages] = useState({})
    const { projectID, proposalID } = useParams()
    const { token } = useToken()
    const [successfulUpdate, setSuccessfulUpdate] = useState()

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

    if (successfulUpdate){
        return(
            <Redirect to={`/projects/${projectID}/proposals/${proposalID}`}></Redirect>
        )
    }

    if (loading) {
        return <Loading></Loading>
    } else {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Edit {proposal.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={e => batchEdit(e, 'draft-taxlots', proposalID, setSuccessfulUpdate, setMessages, token)}>
                            {
                                Object.keys(holdings).map((item,key)=>{
                                    return(
                                        <Accordion>
                                            <EditProposalViewOuterCard
                                            heading={productTypes[[item]]}
                                            eventKey={`${key}`}
                                            key={key}
                                            accounts={accounts}
                                            tickers={holdings[[item]]}
                                            holdings={holdings}
                                            setHoldings={setHoldings}
                                            productType={item}
                                            changeHandler={draftTaxLotChangeHandler}></EditProposalViewOuterCard>
                                        </Accordion>
                                    )
                                })
                            }
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Link to={`/projects/${projectID}/`}>Back to Project</Link>
                    </Col>
                    <Col>
                        <Link to={`/dashboard`}>Back to Dashboard</Link>
                    </Col>
                    <Col>
                        <Button onClick={e=>batchEdit(e, 'draft-taxlots', holdings, setSuccessfulUpdate, setMessages, token)}>Update</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditProposalView;