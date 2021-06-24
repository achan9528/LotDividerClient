import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'

export const Loading = (props) => {
    return (
        <Container>
            <Row className="justify-content-md-center d-flex align-items-center full-height">
                <Col md="auto">
                    {/* <Row className="vertical-align">
                        <Col md="auto"> */}
                        <Spinner animation="grow" variant="primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        {/* <Spinner animation="grow" variant="secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> */}
                        <Spinner animation="grow" variant="success" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        {/* <Spinner animation="grow" variant="danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> */}
                        <Spinner animation="grow" variant="warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        {/* <Spinner animation="grow" variant="info" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <Spinner animation="grow" variant="light" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <Spinner animation="grow" variant="dark" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> */}
                        {/* </Col>
                    </Row> */}
                </Col>
            </Row>
        </Container>
        
    )
}