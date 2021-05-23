import { Table, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useToken from '../components/hooks/useToken'
import EditProposalViewInnerCard from './EditProposalViewInnerCard'

export const EditProposalViewOuterCard = (props) =>{

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col>
                        <Accordion.Toggle
                        as={Button} variant={"link"} eventKey={`${props.eventKey}`}>
                        {props.heading}
                        </Accordion.Toggle>
                    </Col>
                    <Col>
                        <h6>Total</h6>
                    </Col>
                    <Col>
                        <h6>Another Total</h6>
                    </Col>
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={`${props.eventKey}`}>
                <Card.Body>
                    {
                        Object.keys(props.holdings).map((item,key)=>{
                            return(
                                <EditProposalViewInnerCard
                                key={key}
                                eventKey={key}
                                header={item}
                                accounts={props.accounts}
                                taxLots={props.holdings[[item]]}></EditProposalViewInnerCard>
                            )
                            
                        })
                    }                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default EditProposalViewOuterCard;