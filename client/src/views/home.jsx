import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { submitHandler } from '../components/helpers'
import useToken from '../components/hooks/useToken';
import { Navbar, Nav, Row, Button, Container, Jumbotron, Col } from 'react-bootstrap'

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