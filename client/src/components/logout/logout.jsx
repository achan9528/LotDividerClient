import { Button } from 'react-bootstrap'
import React from 'react';

export const LogoutLink = (props) => {

    return(
        <Button variant="link" onClick={e=>props.setToken('')}>Logout</Button>
    )
}

export default LogoutLink