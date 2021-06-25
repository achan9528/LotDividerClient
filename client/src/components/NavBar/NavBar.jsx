import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import LogoutLink from '../logout/logout'
import React from 'react';

const NavBar = (props) => {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/dashboard">Lot Divider</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard/">Dashboard</Nav.Link>
                    <Nav.Link href="/projects/">Projects</Nav.Link>
                    <Nav.Link href="/proposals/">Proposals</Nav.Link>
                    <Nav.Link href="/portfolios/">Portfolios</Nav.Link>
                    <LogoutLink setToken={props.setToken}></LogoutLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar