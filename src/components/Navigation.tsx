import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Formik } from 'formik';

export class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { city: 'pink' }
        this.logout = this.logout.bind(this);
    }


    public logout() {
        localStorage.removeItem("authToken");
        this.setState({ true: true });
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={this.state}
                    enableReinitialize={true}
                    onSubmit={this.logout.bind(this.props)}
                    render={() =>
                        <Navbar bg="dark" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/">Home</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/customer">Customer</NavLink>
                                    <NavLink className="d-inline p-2 bg-dark text-white"
                                        to="/employee">Employee</NavLink>
                                </Nav>
                            </Navbar.Collapse>
                            <Button variant="secondary" type="submit" hidden={localStorage.getItem('authToken') ? false : true} onClick={this.logout.bind(this)}>Log Out</Button>
                        </Navbar>}
                />

            </div>
        );
    }
}
