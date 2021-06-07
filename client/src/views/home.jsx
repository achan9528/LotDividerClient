import { Link } from 'react-router-dom';
import React from 'react';
import { Row, Container, Jumbotron, Col } from 'react-bootstrap'

export const HomePage = (props) => {
    return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Jumbotron>
                            <h1>Welcome!</h1>
                            <h2>Here are some links below:</h2>
                            <ul>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/registration">Register</Link></li>
                            </ul>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
    )
}

export default HomePage;