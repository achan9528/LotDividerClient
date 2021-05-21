import { Table, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'

const ProposalViewInnerCard = (props) => {

    return(
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                    as={Button} variant={"link"} eventKey={`${props.key}`}>
                        {props.header}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`${props.key}`}>
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
                                {/* {
                                    Object.keys(props.holdings).map((item,key)=>{
                                        let taxLot = item;
                                        let component = props.accounts.map((item,key)=>{
                                            return(
                                                <tr>
                                                    <td>{taxLot}</td>
                                                    <td>{props.holdings[[taxLot]][[item]].units}</td>
                                                    <td>{props.holdings[[taxLot]][[item]].marketValue}</td>
                                                </tr>
                                            )
                                        })
                                        return component
                                    })
                                } */}
                                {
                                    Object.keys(props.taxLots).map((item,key)=>{
                                        let taxLot = item;
                                        let unitColumns = props.accounts.map((item,key)=>{
                                            return(
                                                <td>{props.taxLots[[taxLot]][[item]].units}</td>
                                            )
                                        })
                                        let marketValueColumns = props.accounts.map((item,key)=>{
                                            return(
                                                <td>{props.taxLots[[taxLot]][[item]].marketValue}</td>
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