import { Table, Button, Form } from 'react-bootstrap'
import React from 'react';
import { getHoldingsForProposalForm } from '../helpers'

const SelectAccount = (props) => {
    return(
        <Form>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.accounts.map((item,key)=>{
                            return(
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.number}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button
                                        variant='link'
                                        onClick={e=>getHoldingsForProposalForm(
                                            e, 
                                            item,
                                            props.setTargetAccount,
                                            props.setHoldings,
                                            props.step,
                                            props.setStep,
                                            props.token)}>Select</Button>
                                    </td>
                                </tr>
                            )
                            
                        })
                    }
                </tbody>
            </Table>
        </Form>
    )
}

export default SelectAccount