import { Button, Row, Form, Col, Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory, useParams } from 'react-router-dom'
import SelectAccount from '../components/SelectAccount'
import MultiStepFormHoldingsSelectTable from '../components/MultiStepFormHoldingsSelectTable'
import TaxLotSelectionDetails from '../components/TaxLotSelectionDetails'
import ProposalConfirmationPage from '../components/ProposalConfirmationPage'

const NewProposalForm = (props) => {
    const [proposalName, setProposalName] = useState();
    const {token} = useToken();
    const [step, setStep] = useState(0);
    const {projectID} = useParams();
    const [accounts, setAccounts] = useState();
    const [targetAccount, setTargetAccount] = useState();
    const [holdings, setHoldings] = useState([]);
    const [targetHoldings, setTargetHoldings] = useState({});
    const [numberOfPortfolios, setNumberOfPortfolios] = useState();
    const [method, setMethod] = useState("HIFO");
    let history = useHistory();

    useEffect(()=>{
        let url = `${process.env.REACT_APP_API_URL}:8000/api/accounts/`
        let data = {
            headers:{
                Authorization: `Token ${token}`
            }
        }
        fetch(url, data)
        .then(res => res.json())
        .then(data => {
            setAccounts(data);
            console.log(data);
        })
        .catch(err=> console.log(err));
    }, [])

    const getHoldings = (e, targetAccount) => {
        let url = `${process.env.REACT_APP_API_URL}:8000/api/accounts/${targetAccount.id}/`
        let data = {
            headers:{
                Authorization: `Token ${token}`
            }
        }
        fetch(url,data)
        .then(res=>res.json())
        .then(data=>{
            setHoldings([...data.holdings]);
            setTargetAccount(targetAccount);
            setStep(step+1);
        })
        .catch(err=>console.log(err))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}:8000/api/proposals/`
        console.log({
            projectID: parseInt(projectID),
            proposalName: proposalName,
            autoCalculate: 'true',
            accountID: targetAccount.id,                
            numberOfPortfolios: numberOfPortfolios,
            targetShares: targetHoldings,
            method: method,
        })
        const data = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                projectID: projectID,
                proposalName: proposalName,
                autoCalculate: 'true',
                accountID: targetAccount.id,                
                numberOfPortfolios: numberOfPortfolios,
                targetShares: targetHoldings,
                method: method,
            })
        };
        fetch(url, data)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            history.push('/dashboard')
        })
        .catch(err=>{
            console.log(err);
        });
    }

    let content = [];
    if (step === 0){ // step 1: new proposal name
        content.push(
            <h2>
                Name Your Proposal
            </h2>
        )
        content.push( 
            <Form.Group>
                <Form.Label>Proposal Name</Form.Label>
                <Form.Control
                    onChange={e=>setProposalName(e.target.value)}
                    value={proposalName}></Form.Control>
            </Form.Group>
        )
        content.push(
            <Button
            variant="link"
            onClick={e=>setStep(step+1)}>Next</Button>
        )
    } else if (step === 1){  // step 2: select account to work with
        content.push(
            <h2>
                Select Account
            </h2>
        )
        content.push(
            <SelectAccount
            accounts={accounts}
            getHoldings={getHoldings}></SelectAccount>
        )
        content.push(
            <Row>
                <Col>
                    <Button
                    variant="link"
                    onClick={e=>setStep(step-1)}>Back</Button>
                </Col>
            </Row>
        )
    } else if (step === 2) { // step 3: select holdings and methods
        content.push(
            <h2>
                Select Holdings
            </h2>
        )
        content.push(
            <MultiStepFormHoldingsSelectTable
            holdings={holdings}
            targetHoldings={targetHoldings}
            setTargetHoldings={setTargetHoldings}></MultiStepFormHoldingsSelectTable>
        )
        content.push(
            <Row>
                <Col>
                    <Button
                    variant="link"
                    onClick={e=>setStep(step-1)}>Back</Button>
                    <Button
                    variant="link"
                    onClick={e=>setStep(step+1)}>Next</Button>
                </Col>
            </Row>
        )
    } else if (step === 3) { // Step 4: Tax Lot Selection Details
        content.push(
            <h2>
                Tax Lot Selection Details
            </h2>
        )
        content.push(
            <TaxLotSelectionDetails
            numberOfPortfolios={numberOfPortfolios}
            setNumberOfPortfolios={setNumberOfPortfolios}
            setMethod = {setMethod}
            method= {method}
            ></TaxLotSelectionDetails>
        )
        content.push(
            <Row>
                <Col>
                    <Button
                    variant="link"
                    onClick={e=>setStep(step-1)}>Back</Button>

                </Col>
                <Col>
                    <Button
                        variant="link"
                        onClick={e=>setStep(step+1)}>Next</Button>
                </Col>
            </Row>
        )
    } else if (step === 4) { // Step 5: Confirmation Step
        content.push(
            <h2>Confirm Proposal Details</h2>
        )
        content.push(
            <ProposalConfirmationPage
            proposalName={proposalName}
            account={targetAccount}
            holdings={targetHoldings}
            selectionMethod={method}
            numberOfPortfolios={numberOfPortfolios}></ProposalConfirmationPage>
        )
        content.push(
            <Row>
                <Col lg={10}>
                    <Button
                    variant="link"
                    onClick={e=>setStep(step-1)}>Back</Button>
                </Col>
                <Col>
                    <Button
                        onClick={e=>submitHandler(e)}>Submit</Button>
                </Col>
            </Row>
        )
    }

    return(
        <Container 
            className="justify-content-md-center">
            {
                content.map((item,key)=>{
                    return(
                        <Row key={key}>
                            <Col>
                                {item}
                            </Col>
                        </Row>
                    )
                })      
            }
        </Container>
    )
}

export default NewProposalForm