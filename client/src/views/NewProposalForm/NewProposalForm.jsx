import { Button, Row, Form, Col, Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import useToken from '../../components/hooks/useToken'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import SelectAccount from '../../components/SelectAccount/SelectAccount'
import MultiStepFormHoldingsSelectTable from '../../components/MultiStepFormHoldingsSelectTable/MultiStepFormHoldingsSelectTable'
import TaxLotSelectionDetails from '../../components/TaxLotSelectionDetails/TaxLotSelectionDetails'
import ProposalConfirmationPage from '../../components/ProposalConfirmationPage/ProposalConfirmationPage'
import { getEntries, getHoldingsForProposalForm, createEntry } from '../../components/helpers'
import { Loading } from '../../components/Loading/Loading'
import { ProjectsTable } from '../../components/ProjectsTable/ProjectsTable'

const NewProposalForm = (props) => {
    const [proposalName, setProposalName] = useState();
    const {token, setToken} = useToken();
    const [step, setStep] = useState(0);
    const {projectID} = useParams();
    const [accounts, setAccounts] = useState();
    const [targetAccount, setTargetAccount] = useState();
    const [holdings, setHoldings] = useState([]);
    const [targetHoldings, setTargetHoldings] = useState({});
    const [numberOfPortfolios, setNumberOfPortfolios] = useState();
    const [method, setMethod] = useState("HIFO");
    const [selectedProject, setSelectedProject ] = useState();
    const [selectedProjectName, setSelectedProjectName ] = useState();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [pages, setPages] = useState();
    const [successfulCreate, setSuccessfulCreate] = useState(false);
    let history = useHistory();

    useEffect(()=>{
        loading
        ? getEntries('accounts', setAccounts, setPages, setLoading, setMessages, token)
        : setLoading(false)
    }, [])

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
            setTargetAccount={setTargetAccount}
            setHoldings={setHoldings}
            step={step}
            setStep={setStep}
            token={token}></SelectAccount>
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
            setTargetHoldings={setTargetHoldings}
            ></MultiStepFormHoldingsSelectTable>
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
    } else if (step === 4) { // Step 5: Set Project ID if none
        if (projectID===undefined){
            content.push(
                <h2>Choose Project</h2>
            )
            content.push(
                <ProjectsTable 
                setSelectedProject={setSelectedProject}
                setSelectedProjectName={setSelectedProjectName}
                ></ProjectsTable>
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
        } else {
            setSelectedProject(projectID)
            setStep(step+1);
        }
    } else { // Step 6: Confirmation Step
        content.push(
            <h2>Confirm Proposal Details</h2>
        )
        content.push(
            <ProposalConfirmationPage
            proposalName={proposalName}
            account={targetAccount}
            holdings={targetHoldings}
            selectionMethod={method}
            numberOfPortfolios={numberOfPortfolios}
            selectedProject={selectedProject}
            selectedProjectName={selectedProjectName}
            ></ProposalConfirmationPage>
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
                        onClick={e=>createEntry(
                        e, 
                        'proposals',
                        {
                            projectID: selectedProject,
                            proposalName: proposalName,
                            autoCalculate: 'true',
                            accountID: targetAccount.id,                
                            numberOfPortfolios: numberOfPortfolios,
                            targetShares: targetHoldings,
                            method: method,
                        },
                        setSuccessfulCreate,
                        setMessages,
                        token,
                        true,
                        false)}
                    >Submit</Button>
                </Col>
            </Row>
        )
    }

    if (successfulCreate){
        return <Redirect to="/dashboard"></Redirect>
    }
    if (loading){
        return <Loading></Loading>
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