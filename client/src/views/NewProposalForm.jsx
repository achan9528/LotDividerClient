import { submitHandler } from '../components/helpers'
import InputGroup from '../components/inputGroup'
import { Button, Row, Form, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory, useParams } from 'react-router-dom'
import SelectAccount from '../components/SelectAccount'
import MultiStepFormHoldingsSelectTable from '../components/MultiStepFormHoldingsSelectTable'
import TaxLotSelectionDetails from '../components/TaxLotSelectionDetails'

const NewProposalForm = (props) => {
    const [proposalName, setProposalName] = useState();
    const {token, setToken} = useToken();
    const [step, setStep] = useState(0);
    const {projectID} = useParams();
    const [accounts, setAccounts] = useState();
    const [targetAccount, setTargetAccount] = useState();
    const [holdings, setHoldings] = useState([]);
    let history = useHistory();

    useEffect(()=>{
        let url = 'http://localhost:8000/api/accounts/'
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

    const getHoldings = (e, targetAccountID) => {
        let url = `http://localhost:8000/api/accounts/${targetAccountID}/`
        let data = {
            headers:{
                Authorization: `Token ${token}`
            }
        }
        fetch(url,data)
        .then(res=>res.json())
        .then(data=>{
            setHoldings([...data.holdings]);
            setTargetAccount(targetAccountID);
            setStep(step+1);
        })
        .catch(err=>console.log(err))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/proposals/";
        const data = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: proposalName,
                project: projectID,
            })
        };
        console.log(data);
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
    if (step == 0){ // step 1: new proposal name
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
    } else if (step == 1){  // step 2: select account to work with
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
    } else if (step == 2) { // step 3: select holdings and methods
        content.push(
            <h2>
                Select Holdings
            </h2>
        )
        content.push(
            <MultiStepFormHoldingsSelectTable
            holdings={holdings}></MultiStepFormHoldingsSelectTable>
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
    } else if (step == 3) { // Step 4: Tax Lot Selection Details
        content.push(
            <h2>
                Tax Lot Selection Details
            </h2>
        )
        content.push(
            <TaxLotSelectionDetails>
            </TaxLotSelectionDetails>
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