import { Table, Button, Accordion, Card } from 'react-bootstrap'
import React from 'react';

const ProposalViewInnerCard = (props) => {

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
                        <Table striped bordered hover responsive>
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
                                    {
                                        props.accounts.map((item,key)=>{
                                            return(
                                                <th key={key}>
                                                    Market Value in Draft Account {item}
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
                                                <td key={key}>{props.taxLots[[taxLot]][[item]].units}</td>
                                            )
                                        })
                                        let marketValueColumns = props.accounts.map((item,key)=>{
                                            return(
                                                <td key={key}>{props.taxLots[[taxLot]][[item]].marketValue}</td>
                                            )
                                        })
                                        return(
                                            <tr key={key}>
                                                <td>{item}</td>
                                                {unitColumns}
                                                {marketValueColumns}
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

export default ProposalViewInnerCard;