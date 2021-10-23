import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect bg='dark' variant='dark'>
            <Container>
            <Navbar.Brand href="/home">Twitch Information Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav>
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;
