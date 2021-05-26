import { Button } from 'react-bootstrap'

export const LogoutLink = (props) => {

    return(
        <Button variant="link" onClick={e=>props.setToken('')}>Logout</Button>
    )
}

export default LogoutLink