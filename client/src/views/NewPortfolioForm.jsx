import { submitHandler } from '../components/helpers'
import InputGroup from '../components/inputGroup'
import { Button, Row, Form, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useToken from '../components/hooks/useToken'
import { useHistory } from 'react-router-dom'
import MultiStepFormHoldingsTable from '../components/MultiStepFormHoldingsTable'
import MultiStepFormAccountTable from '../components/MultiStepFormAccountTable'

const NewPortfolioForm = (props) => {
    const [step, setStep] = useState("");
    const [portfolioName, setPortfolioName] = useState("");
    const [holdings, setHoldings] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentAccount, setCurrentAccount] = useState();
    const {token, setToken} = useToken();

    useEffect(()=>{
        setStep(0);
    }, [])
    
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('portfolioName', portfolioName);
        formData.append('accounts', accounts);
        formData.append('holdings', holdings);
        formData.append('0', files[0]);
        let url = "http://localhost:8000/api/portfolios/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData
        })
        .then(res => res.json())
        .then(data=> console.log(data))
        .catch(err=> console.log(err));
    }
    
    const fileHandler = (e, targetAccount) => {
        console.log(e.target.files[0])
        e.preventDefault();
        let updatedFiles = files;
        updatedFiles[targetAccount] = e.target.files[0];
        setFiles([...updatedFiles])
        console.log(files);
    }

    // step process
    const nextStep = (e) => {
        setStep(step+1);
    }

    const toHoldingsStep = (e, key) => {
        setCurrentAccount(key);
        setStep(step+1);
    }
    const prevStep = (e) => {
        setStep(step-1);
    }

    // content rendering and step process

    let content = [];

    if (step==0){
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
            <Button onClick={e=>nextStep(e)}>
                Next
            </Button>
        )
    } else if (step == 1){
        content.push(
            <h2>Add Accounts in "{portfolioName}"</h2>
        );
        content.push(
            <MultiStepFormAccountTable
            headers={["Name"]}
            accounts={accounts}
            setAccounts={setAccounts}
            setHoldings={setHoldings}
            holdings={holdings}
            toHoldingsStep={toHoldingsStep}
            files={files}></MultiStepFormAccountTable>
        )
        content.push(
            <Button onClick={e=>prevStep(e)}>
                Previous
            </Button>
        )
    } else if (step == 2){
        content.push(
            <h2>Add Holdings and Tax Lots In "{accounts[currentAccount].name}"</h2>
        );
        content.push(
            <Form.Group>
                <Form.Label>Upload Holdings</Form.Label>
                <Form.File 
                name={"account-" + currentAccount + "-holdings"}
                onChange={e=>fileHandler(e, currentAccount)}></Form.File>
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
            <Button onClick={e=>prevStep(e)}>
                Previous
            </Button>
        )
        content.push(
            <Button type="submit">
                Submit
            </Button>
        )
    }

    return(
        <Row className="justify-content-md-center">
            <Form onSubmit={e=>submitHandler(e)}>
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