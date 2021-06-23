import { Button, Col, Row, Accordion, Card } from 'react-bootstrap'
import ProposalViewInnerCard from '../ProposalViewInnerCard/ProposalViewInnerCard'
import React from 'react';

export const ProposalViewOuterCard = (props) =>{

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
                    {/* <Col>
                        <h6>Total</h6>
                    </Col>
                    <Col>
                        <h6>Another Total</h6>
                    </Col> */}
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={`${props.eventKey}`}>
                <Card.Body>
                    {
                        Object.keys(props.holdings).map((item,key)=>{
                            return(
                                <ProposalViewInnerCard
                                key={key}
                                eventKey={key}
                                header={item}
                                accounts={props.accounts}
                                taxLots={props.holdings[[item]]}></ProposalViewInnerCard>
                            )
                            
                        })
                    }                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default ProposalViewOuterCard;