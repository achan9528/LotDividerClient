import { Table, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import useToken from '../components/hooks/useToken'
import EditProposalViewOuterCard from '../components/EditProposalViewOuterCard'

export const EditProposalView = (props) =>{
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState()
    const [accounts, setAccounts] = useState([])
    const [holdings, setHoldings] = useState({})
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState()
    const { id } = useParams()
    const { token, setToken } = useToken()

    useEffect(()=>{
        if (loading){
            getData();
        } else {
            getSections(proposal)
        }
    }, [loading])

    const productTypes = {
        stocks: 'Stocks',
        mutualFunds: 'Mutual Funds',
        bonds: 'Bonds',
    }

    const getData = () => {
        const url = `http://localhost:8000/api/proposals/${id}/`
        const data = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res=> res.json())
        .then(data=>setProposal(data))
        .then(data=>setLoading(false))
        .catch(err=>{console.log(err)})
    }

    const deleteProject = (e) => {
        const url = `http://localhost:8000/api/proposals/${id}/`
        const data = {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res=> {
            res.status == 204
            ? setDeleted(true)
            : setMessage(res.statusText)
        })
        .catch(err=>{console.log(err)})
    }

    const getSections =  (proposal) =>{
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

    console.log(deleted)
    if (deleted) {
        console.log('deleted')
        return (
            <Redirect to="/dashboard"></Redirect>
        )
    }

    if (!loading){
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>Edit {proposal.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                            {
                                Object.keys(holdings).map((item,key)=>{
                                    return(
                                        <Accordion>
                                            <EditProposalViewOuterCard
                                            heading={productTypes[[item]]}
                                            eventKey={`${key}`}
                                            key={key}
                                            accounts={accounts}
                                            holdings={holdings[[item]]}></EditProposalViewOuterCard>
                                        </Accordion>
                                    )
                                })
                            }

                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Link to={`proposals/${id}/edit`}>Back</Link>
                    </Col>
                    <Col>
                        <Button 
                        onClick={e=>{deleteProject(e)}}>Update</Button>
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

export default EditProposalView;