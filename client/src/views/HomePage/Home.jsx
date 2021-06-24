import { Link } from 'react-router-dom';
import React from 'react';
import { Row, Container, Jumbotron, Col, Button } from 'react-bootstrap'
import { getHomePageText } from '../../components/helpers'

export const Home = (props) => {
    let description = getHomePageText().description
    // useEffect(()=>{
    //     description = getHomePageText().description
    // }, [])
    return (
        <Container>
                <Row className="justify-content-md-center">
                    <Col className="text-align-center">
                        <h1>Lot Divider</h1>
                        <p>{description}</p>
                        <Button variant="link">
                            How it works
                        </Button>
                        <Link to="/login">
                            <Button variant="link">
                                Get Started
                            </Button>
                        </Link>
                    </Col>
                </Row>
        </Container>
    )
}