import React from 'react'
import '../assets/css/Common.css'
import {Container, Navbar, NavDropdown} from "react-bootstrap";

const PageHeader = (prop) => {
    function logout() {
        localStorage.removeItem('lmsToken');
        if (!localStorage.getItem('lmsToken')) {
            window.location = "/"
        }
    }
    console.log(prop.data);
    return (
        <Navbar className='navWrap'>
            <Container>
                <Navbar.Brand href="/">
                    LMS Platform
                </Navbar.Brand>
                {
                    (Object.keys(prop.data).length !== 0)?(
                        <NavDropdown id="basic-nav-dropdown" title={prop.data.email}>
                            <NavDropdown.Item href={prop.data.id}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ):''
                }

            </Container>
        </Navbar>
    )
}
export default PageHeader