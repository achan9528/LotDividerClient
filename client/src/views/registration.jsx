// registration form
import React, { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegistrationForm = (props) => {

    const [name, setName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [messages, setMessages ] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                alias: alias,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            })
        }

        const url = 'http://ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000/api/rest-auth/registration/'
        // const url = 'http://localhost:8000/api/rest-auth/registration/'

        fetch(url, data)
        .then(res => {
            if (res.status === 200 || res.status == 201 || res.status === 204) {
                props.setToken(res.json())
            } else {
                console.log(res.json())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Row>
                        <Col>
                            <h1>Register For An Account</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>Come join the club!</h4>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form onSubmit={e=>submitHandler(e)}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            value={name}
                            onChange={e=>setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alias</Form.Label>
                            <Form.Control
                            value={alias}
                            onChange={e=>setAlias(e.target.value)}></Form.Control>
                        </Form.Group>
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
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            value={passwordConfirm}
                            onChange={e=>setPasswordConfirm(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" block>Register</Button>
                        </Form.Group>        
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Link to="/login">Already have an account? Sign in here</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default RegistrationForm;