import {Button, Table, Form} from 'react-bootstrap';
import React from 'react';

const MultiStepFormHoldingsTable = (props)=>{

    const addRow = (e) => {
        e.preventDefault();
        let updatedAccountHoldings = props.holdings[props.currentAccount];
        updatedAccountHoldings = [...updatedAccountHoldings, {
            ticker: "",
            cusip: "",
            taxLotNumber: "",
            units: "",
            acquisitionDate: "",
        }]
        let allUpdatedHoldings = props.holdings;
        allUpdatedHoldings[props.currentAccount] = updatedAccountHoldings;
        props.setHoldings([...allUpdatedHoldings])
    }

    let tdata;
    if (props.holdings.length === 0){
        tdata = 
        <tr>
            <td>No Holdings</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    } else {
        console.log(props.holdings[props.currentAccount])
        tdata = props.holdings[props.currentAccount].map((item,key)=>{
            return(
                <tr key={key}>
                    <td>{item.ticker}</td>
                    <td>{item.cusip}</td>
                    <td>{item.taxLotNumber}</td>
                    <td>{item.units}</td>
                    <td>{item.acquisitionDate}</td>
                </tr>
            )
        })
    }

    return (
        <Form>
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
                        </tr>
                    </thead>
                    <tbody>
                        {tdata}
                    </tbody>
                </Table>
                <Button onClick={e=>addRow(e)}>+</Button>
            </Form.Group>
        </Form>
    )
}

export default MultiStepFormHoldingsTable;