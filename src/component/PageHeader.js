import React from "react";
import "../assets/css/Common.css";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

const PageHeader = (prop) => {
  function logout() {
    localStorage.removeItem("lmsToken");
    if (!localStorage.getItem("lmsToken")) {
      window.location = "/";
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">LMS Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/contents">Contents</Nav.Link>
        <Nav.Link href="/assignments">Assignments</Nav.Link>
        <Nav.Link href="/grades">Grades</Nav.Link>
        <Nav.Link href="/calendar">Calendar</Nav.Link>

        {Object.keys(prop.data).length !== 0 ? (
          <NavDropdown className="justify-content-end" id="basic-nav-dropdown" title={prop.data.email}>
            <NavDropdown.Item href={prop.data.id}>Profile</NavDropdown.Item>
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
