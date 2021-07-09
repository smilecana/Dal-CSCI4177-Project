import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios';
import {Button, Container, Form} from "react-bootstrap";

const SignIn = () => {
    let history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function submitForm(e) {
        e.preventDefault();
        if (password === "") {
            alert("Please fill the username field");
            return;
        }
        if (email === "") {
            alert("Please fill the email field");
            return;
        }
        axios
            .post("https://tutorial4-api.herokuapp.com/api/users/login", {
                email: email,
                password: password,
            }).then(response => {
            if (response.status) {
                alert(response.data.message);
                localStorage.setItem('user', email);
                history.push('/users');
            }
        }).catch(function () {
            alert("Could not creat account. Please try again");
        });
    }

    return (
        <>
            <Container>
                <br/>
                <br/>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
};
export default SignIn