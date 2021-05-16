import {Button, Table, Form} from 'react-bootstrap';

const MultiStepFormAccountTable = (props)=>{

    const addRow = (e) => {
        e.preventDefault();
        props.setAccounts([...props.accounts, {
            name: ""
        }]);
        props.setHoldings([...props.holdings, []])
    }

    const changeHandler = (e, key) =>{
        let tdata = props.accounts;
        tdata[key].name = e.target.value;
        props.setAccounts(tdata);
    }

    return (
        <Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            props.headers.map((item,key)=>{
                                return (
                                    <th key={key}>{item}</th>
                                )
                            })
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.accounts.map((item,key)=>{
                            return(
                                <tr key={key}>
                                    <td>
                                        <Form.Group>
                                            <Form.Label>{item.name}</Form.Label>
                                            <Form.Control
                                            onChange={(e)=>changeHandler(e, key)}></Form.Control>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Button 
                                        variant="link"
                                        onClick={e=>props.toHoldingsStep(e, key)}>
                                        Add Holdings / Tax Lots
                                        </Button>
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={e=>addRow(e)}>+</Button>
        </Form.Group>
        
    )
}

export default MultiStepFormAccountTable;