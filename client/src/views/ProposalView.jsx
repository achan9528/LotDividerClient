import { Table, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'
import ProposalViewOuterCard from '../components/ProposalViewOuterCard'

export const ProposalView = (props) =>{
    const [proposal, setProposal] = useState({})
    const [accounts, setAccounts] = useState([])
    const [holdings, setHoldings] = useState({})
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
        // .then(data=> console.log(proposal))
        .then(res => getSections(proposal))
        .catch(err => console.log(err));
    }, [])

    const productTypes = {
        stocks: 'Stocks',
        mutualFunds: 'Mutual Funds',
        bonds: 'Bonds',
    }

    const getSections = (proposal) =>{
        let holdings = {
            stocks: {},
            mutualFunds: {},
            bonds: {},
        };
        let accounts = [];
        // for each draftAccoumt, go through the holdings and add the 
        // tax lots for each holding to a dictionary. Add this
        // dictionary to the master dictionary
        proposal.draftPortfolios.forEach((draftPortfolio)=>{
            draftPortfolio.draftAccounts.forEach((draftAccount)=>{
                let draftHoldings = draftAccount.draftHoldings
                accounts.push(draftAccount.id)
                for (let i =0; i < draftHoldings.length; i++){
                    let draftHolding  = draftHoldings[i]
                    let productType = draftHolding.security.productType.name
                    let ticker = draftHolding.security.ticker
                    let accountNumber = draftHolding.draftAccount
                    let draftTaxLots = draftHolding.draftTaxLots
                    if (productType=='stock'){
                        if (!holdings['stocks'].hasOwnProperty(ticker)){
                            holdings['stocks'][[ticker]] = {}
                        }
                        for (let j = 0; j < draftTaxLots.length; j++){
                            let referencedLot = draftTaxLots[j].referencedLot
                            if (!holdings['stocks'][ticker].hasOwnProperty(referencedLot)){
                                holdings['stocks'][ticker][[referencedLot]] = {}
                            }
                            holdings['stocks'][ticker][[referencedLot]][[accountNumber]] = 
                                {
                                    units: draftTaxLots[j].units,
                                    marketValue: draftTaxLots[j].marketValue
                                }
                        }
                    }
                }
                
            })
        })
        setHoldings({...holdings});
        setAccounts([...accounts])
    }

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
                        {
                            Object.keys(holdings).map((item,key)=>{
                                return(
                                    <ProposalViewOuterCard
                                    heading={productTypes[[item]]}
                                    eventKey={`${key}`}
                                    key={key}
                                    accounts={accounts}
                                    holdings={holdings[[item]]}></ProposalViewOuterCard>
                                )
                            })
                        }
                    </Accordion>
                    <Link to={`proposals/${id}/edit`}>Edit Proposal</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ProposalView;