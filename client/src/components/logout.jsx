import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export const LogoutLink = (props) => {

    return(
        <Button variant="link" onClick={e=>props.setToken('')}>Logout</Button>
    )
}

export default LogoutLink