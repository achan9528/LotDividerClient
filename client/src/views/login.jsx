// registration form
import React, { useState } from 'react'
import InputGroup from '../components/inputGroup'
import { Redirect } from 'react-router-dom'
import {useToken} from '../components/hooks/useToken'

const LoginForm = (props) => {
    const {token, setToken} = useToken()    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e) => {
        // prevent default form submission
        e.preventDefault()
        // send AJAX call with fetch API
        const url = 'http://localhost:8000/api/rest-auth/login/'
        const data = {
            email: email,
            password: password,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
        .then(data => {
            props.setToken(data);
        }).catch(err => {
            console.log(err);
        })
    }
    console.log(token)
    return (
        <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={(e) => submitHandler(e)} >
                <InputGroup label='Email' name='email' stateFunction={setEmail}></InputGroup>
                <InputGroup label='Password' name='password' stateFunction={setPassword}></InputGroup>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;