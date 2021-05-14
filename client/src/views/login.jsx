// registration form
import React, { useState } from 'react'
import InputGroup from '../components/inputGroup'

const LoginForm = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const data = {
        email: email,
        password: password,
    }

    const url = 'http://localhost:8000/api/rest-auth/login/'

    return (
        <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={(e) => props.submitHandler(e, data, url, props.setToken)} >
                <InputGroup label='Email' name='email' stateFunction={setEmail}></InputGroup>
                <InputGroup label='Password' name='password' stateFunction={setPassword}></InputGroup>
                <button>Login</button>
            </form>
        </div>

    )
}

export default LoginForm;