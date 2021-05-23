import { Table, Button, Accordion, Card, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

const EditProposalViewInnerCard = (props) => {

    return(
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                    as={Button} variant={"link"} eventKey={`${props.eventKey}`}>
                        {props.header}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`${props.eventKey}`}>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tax Lot Number</th>
                                    {
                                        props.accounts.map((item,key)=>{
                                            return(
                                                <th key={key}>
                                                    Units in Draft Account {item}
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(props.taxLots).map((item,key)=>{
                                        let taxLot = item;
                                        let unitColumns = props.accounts.map((item,key)=>{
                                            return(
                                                <td>
                                                    <Form.Control
                                                    value={props.taxLots[[taxLot]][[item]].units}></Form.Control>
                                                    
                                                </td>
                                            )
                                        })
                                        return(
                                            <tr key={key}>
                                                <td>{item}</td>
                                                {unitColumns}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default EditProposalViewInnerCard;