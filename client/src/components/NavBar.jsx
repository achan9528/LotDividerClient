import { Redirect } from 'react-router-dom'
import {useToken} from '../components/hooks/useToken'
import { Navbar, Nav, Row, Button, Container } from 'react-bootstrap'
import LogoutLink from './logout'

const NavBar = (props) => {
    const {token, setToken} = useToken()
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href='/dashboard'>Lot Divider</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/test">Projects</Nav.Link>
                    <LogoutLink setToken={props.setToken}></LogoutLink>
                </Nav>
        </Navbar>
    )
}

export default NavBar