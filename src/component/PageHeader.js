import React, {useEffect, useState} from "react";
import "../assets/css/Common.css";
import {Container, Navbar, NavDropdown} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import axios from "axios";

const PageHeader = (props) => {
    function logout() {
        localStorage.removeItem("lmsToken");
        if (!localStorage.getItem("lmsToken")) {
            window.location = "/";
        }
    }

    const [user, setUser] = useState('');
    useEffect(() => {
        axios.get(`/api/user/${props.data.id}`).then((response) => {
            return setUser(response.data.users);
        });
    }, [props, user]);
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">LMS Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/contents">Contents</Nav.Link>
                        <Nav.Link href="/assignments">Assignments</Nav.Link>
                        <Nav.Link href="/grades">Grades</Nav.Link>
                        {Object.keys(props.data).length !== 0 ? (
                            <NavDropdown className="justify-content-end" id="basic-nav-dropdown"
                                         title={props.data.email}>
                                <NavDropdown.Item as={Link} to={'/user/' + props.data.id}
                                                  exact>Profile</NavDropdown.Item>
                                {
                                    (user.type === '0') ? <>
                                        <NavDropdown.Item as={Link} to={'/admin/users'} exact>ManageUser</NavDropdown.Item>
                                    </> : <></>

                                }
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            ""
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default PageHeader;
