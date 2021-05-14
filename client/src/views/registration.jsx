// registration form
import React, { useState } from 'react'
import InputGroup from '../components/inputGroup'

const RegistrationForm = (props) => {

    const [name, setName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const data = {
        name: name,
        alias: alias,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
    }

    const url = 'http://localhost:8000/api/rest-auth/registration/'

    return (
        <div>
            <h1>Please Register</h1>
            <form onSubmit={(e) => { props.submitHandler(e, data, url) }} >
                <InputGroup label='Name' name='name' stateFunction={setName}></InputGroup>
                <InputGroup label='Alias' name='alias' stateFunction={setAlias}></InputGroup>
                <InputGroup label='Email' name='email' stateFunction={setEmail}></InputGroup>
                <InputGroup label='Password' name='password' stateFunction={setPassword}></InputGroup>
                <InputGroup label='Confirm Password' name='passwordConfirm' stateFunction={setPasswordConfirm}></InputGroup>
                <button></button>
            </form>
        </div>

    )
}

export default RegistrationForm;