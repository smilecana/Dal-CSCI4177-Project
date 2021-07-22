import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios';
import {Button, Container, Form} from 'react-bootstrap';
import '../assets/css/Register.css'


const Register = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        'type': '',
        'userName': '',
        'email': '',
        'password': ''
    });
    const [err, setErr] = useState({
        'userName': false,
        'email': false,
        'password': false,
        'confirmPwd': false
    })

//Check validation each time a user enters Input.
    const handleInputChange = (keyName, e) => {
        if (keyName === 'userName') {
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
        } else if (keyName === "confirmPwd") {
            if (user.password !== e.target.value) {
                setErr({...err, [keyName]: true});
                return;
            }
        }
        setUser({...user, [keyName]: e.target.value});
        if (keyName === 'type') {
            setUser({...user, [keyName]: e.target.id.substr(e.target.id.length - 1)});
        }
        setErr({...err, [keyName]: false});
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post("/signup", user).then(res => {
            if (res.status === 200) {
                alert(res.data.message);
                history.push('/');
            }
        }).catch(e => {
            alert(e.response.data.message);
        });
    }

    return (
        <>
            <Container className="wrap">
                <h2>Sign up</h2>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-6" controlId="formUserType">
                        <Form.Check
                            inline
                            type="radio"
                            label="Student"
                            name="formUserType"
                            id="type1"
                            className="student"
                            onChange={(e) => handleInputChange('type', e)}
                            required
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Instructor"
                            name="formUserType"
                            id="type2"
                            onChange={(e) => handleInputChange('type', e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Control type="text" placeholder="Username"
                                      isInvalid={!!err.userName}
                                      onChange={(e) => handleInputChange('userName', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email"
                                      isInvalid={!!err.email}
                                      onChange={(e) => handleInputChange('email', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="Password" placeholder="Password"
                                      isInvalid={!!err.password}
                                      onChange={(e) => handleInputChange('password', e)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                        <Form.Control type="Password" placeholder="Password Confirmation"
                                      isInvalid={!!err.confirmPwd}
                                      onChange={(e) => handleInputChange('confirmPwd', e)} required/>
                    </Form.Group>

                    <Button type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </>
    )
};
export default Register