import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios';
import {Button, Container, Form} from 'react-bootstrap';

const Register = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        'firstname': '',
        'lastname': '',
        'email': '',
        'password': '',
    });
    const [err, setErr] = useState({
        'firstname': false,
        'lastname': false,
        'email': false,
        'password': false,
        'confirmPwd': false
    })

//Check validation each time a user enters Input.
    const handleInputChange = (keyName, e) => {
        if (keyName === 'firstname' || keyName === 'lastname') {
            let regex = new RegExp(/^[a-zA-Z0-9]*$/); //check the alpha-numeric characters.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        } else if (keyName === 'email') {
            let regex = new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/); //Check the email validation.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        } else if (keyName === "password") {
            let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/);  //It allows alphabets, special characters, and at least 8 characters.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        }
        setUser({...user, [keyName]: e.target.value});
    }

    function submitForm(e) {
        e.preventDefault();
        axios
            .post("/api/users/", user).then(res => {
            if (res.status === 200) {
                history.push('/users');
            }
        }).catch(function () {
            alert("Could not creat account. Please try again");
        });
    }

    return (
        <>
            <Container>
                <Link
                    to={`/`}
                    title="Go Back"
                >
                    <Button>Go Back</Button>
                </Link>
                <br/>
                <br/>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>Firstname:</Form.Label>
                        <Form.Control type="text" placeholder="FirstName"
                                      onChange={(e) => handleInputChange('firstname', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Lastname:</Form.Label>
                        <Form.Control type="text" placeholder="LastName"
                                      onChange={(e) => handleInputChange('lastname', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                                      onChange={(e) => handleInputChange('email', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"
                                      onChange={(e) => handleInputChange('password', e)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
};
export default Register