import { Navbar, Nav } from 'react-bootstrap'
import LogoutLink from './logout'
import React from 'react';

const NavBar = (props) => {
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