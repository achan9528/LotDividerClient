// registration form
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'

const LoginForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e) => {
        // prevent default form submission
        e.preventDefault()
        // send AJAX call with fetch API
        const url = 'http://ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000/api/rest-auth/login/'
        // const url = 'http://localhost:8000/api/rest-auth/login/'
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }
        fetch(url, data)
        .then(res => res.json())
        .then(data => {
            props.setToken(data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Row>
                        <h1>Welcome Back!</h1>
                    </Row>
                    <Row>
                        <h4>Please sign in</h4>
                    </Row>
                    
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form onSubmit={(e) => submitHandler(e)} >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            value={email}
                            onChange={e=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            value={password}
                            onChange={e=>setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="justify-content-md-center">
                            <Button type="submit" block>Login</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Link to="/registration">Don't have an account? Register for one here</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginForm;