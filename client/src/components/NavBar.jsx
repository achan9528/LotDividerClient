import { Redirect } from 'react-router-dom'
import {useToken} from '../components/hooks/useToken'
import { Navbar, Nav, Row, Button, Container } from 'react-bootstrap'

const NavBar = (props) => {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href='/dashboard'>Lot Divider</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/test">Projects</Nav.Link>
                    <Button variant="link"
                        onClick={e=>{props.setToken('')}}>Logout</Button>
                </Nav>
        </Navbar>
    )
}

export default NavBar