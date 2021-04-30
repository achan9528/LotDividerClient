// registration form
import React, { useState } from 'react'
import InputGroup from '../components/inputGroup'


const RegistrationForm = () => {

    const [name, setName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const submitHandler = (e) => {
        // prevent default form submission
        e.preventDefault()
        // package data into one variable
        const data = {
            name: name,
            alias: alias,
            email: email,
            password: password,
        }
        // console.log(data);
        // console.log(JSON.stringify(data));

        // send AJAX call with fetch API to test API route
        fetch('http://localhost:8000/api/welcome/')
            .then(res => {
                console.log(data)
            }).catch(err => {
                console.log(err);
            })

        // send AJAX call with fetch API
        fetch('http://localhost:8000/api/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(data)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Please Register</h1>
            <form onSubmit={(e) => { submitHandler(e) }} >
                <InputGroup label='Name' name='name' changeHandler={setName}></InputGroup>
                <InputGroup label='Alias' name='alias' changeHandler={setAlias}></InputGroup>
                <InputGroup label='Email' name='email' changeHandler={setEmail}></InputGroup>
                <InputGroup label='Password' name='password' changeHandler={setPassword}></InputGroup>
                <InputGroup label='Confirm Password' name='passwordConfirm' changeHandler={setPasswordConfirm}></InputGroup>
                <button></button>
            </form>
        </div>

    )
}

export default RegistrationForm;