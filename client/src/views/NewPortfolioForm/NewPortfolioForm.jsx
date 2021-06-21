import { Button, Row, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import useToken from '../../components/hooks/useToken'
import { Redirect } from 'react-router-dom'
import MultiStepFormHoldingsTable from '../../components/MultiStepFormHoldingsTable/MultiStepFormHoldingsTable'
import MultiStepFormAccountTable from '../../components/MultiStepFormAccountTable/MultiStepFormAccountTable'
import { createPortfolio, fileHandler } from '../../components/helpers'

const NewPortfolioForm = (props) => {
    const [step, setStep] = useState("");
    const [portfolioName, setPortfolioName] = useState("");
    const [holdings, setHoldings] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentAccount, setCurrentAccount] = useState();
    const {token} = useToken();
    const [successfulCreate, setSuccessfulCreate] = useState(false)
    const [messages, setMessages] = useState({})

    useEffect(()=>{
        setStep(0);
    }, [])

    // step process
    const nextStep = (e) => {
        e.preventDefault()
        setStep(step+1);
    }

    const toHoldingsStep = (e, key) => {
        setCurrentAccount(key);
        setStep(step+1);
    }
    const prevStep = (e) => {
        e.preventDefault()
        setStep(step-1);
    }

    // content rendering and step process

    let content = [];

    if (step===0){
        content.push(
            <h2>Add A Portfolio Name</h2>
        )
        content.push(
            <Form.Group>
                <Form.Label>Portfolio Name</Form.Label>
                <Form.Control
                    value={portfolioName}
                    onChange={e=>setPortfolioName(e.target.value)}></Form.Control>
            </Form.Group>
        );
        content.push(
            <Button 
            onClick={e=>nextStep(e)}
            variant="link">
                Next
            </Button>
        )
    } else if (step === 1){
        content.push(
            <h2>Add Accounts in "{portfolioName}"</h2>
        );
        content.push(
            <MultiStepFormAccountTable
            accounts={accounts}
            setAccounts={setAccounts}
            setHoldings={setHoldings}
            holdings={holdings}
            toHoldingsStep={toHoldingsStep}
            files={files}></MultiStepFormAccountTable>
        )
        content.push(
            <Button 
            onClick={e=>prevStep(e)}
            variant="link">
                Previous
            </Button>
        )
        content.push(
            <Button 
            type="submit">
                Submit
            </Button>
        )
    } else if (step === 2){
        content.push(
            <h2>Add Holdings and Tax Lots In "{accounts[currentAccount].name}"</h2>
        );
        content.push(
            <Form.Group>
                <Form.Label>Upload Holdings</Form.Label>
                <Form.File 
                name={"account-" + currentAccount + "-holdings"}
                onChange={e=>fileHandler(e, currentAccount, files, setFiles)}></Form.File>
            </Form.Group>
        )
        content.push(
            <MultiStepFormHoldingsTable
            headers={[
                "Ticker",
                "CUSIP",
                "Tax Lot Number",
                "Units",
                "Acquisition Date"
            ]}
            holdings={holdings}
            currentAccount={currentAccount}
            setHoldings={setHoldings}></MultiStepFormHoldingsTable>
        )
        content.push(
            <Button 
            onClick={e=>prevStep(e)}
            variant="link">
                Previous
            </Button>
        )
    }

    if (successfulCreate){
        return <Redirect to="/dashboard"></Redirect>
    }

    return(
        <Row className="justify-content-md-center">
            <Form 
            onSubmit={e=>createPortfolio(
                e, 
                {
                    portfolioName: portfolioName,
                    accounts: accounts,
                    holdings: holdings,
                    files: files,
                },
                setSuccessfulCreate,
                setMessages,
                token
            )}>
                {
                    content.map((item, key)=>{
                        return(
                            <>
                                {item}
                            </>)
                    })
                }
            </Form>
        </Row>
    )
}

export default NewPortfolioForm