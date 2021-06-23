import { Button, Col, Row, Accordion, Card } from 'react-bootstrap'
import EditProposalViewInnerCard from '../EditProposalViewInnerCard/EditProposalViewInnerCard'
import React from 'react';

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
                        Object.keys(props.tickers).map((item,key)=>{
                            return(
                                <EditProposalViewInnerCard
                                key={key}
                                eventKey={key}
                                header={item}
                                accounts={props.accounts}
                                taxLots={props.tickers[[item]]}
                                productType={props.productType}
                                ticker={item}
                                holdings={props.holdings}
                                setHoldings={props.setHoldings}
                                changeHandler={props.changeHandler}></EditProposalViewInnerCard>
                            )
                            
                        })
                    }                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default EditProposalViewOuterCard;