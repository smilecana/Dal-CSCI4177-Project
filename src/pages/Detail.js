import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Button, Container, Form,} from 'react-bootstrap';
import {useParams} from "react-router";
import {Link, useHistory} from "react-router-dom";

const Detail = () => {
        let history = useHistory();
        let {id} = useParams();
        const [disabled, setDisabled] = useState(true)
        const [user, setUser] = useState({
            'title': '',
            'firstName': '',
            'lastName': '',
            'email': '',
        });
        const [err, setErr] = useState({
            'firstName': false,
            'lastName': false,
            'email': false,
            'title': false
        })
        useEffect(() => {
            axios
                .get(`/api/user/${id}`)
                .then(res => {
                    return setUser({...res.data.users});
                });
        }, []);
        const handleInputChange = (keyName, e) => {
            if (keyName === 'firstName' || keyName === 'lastName') {
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
            }
            setUser({...user, [keyName]: e.target.value});
        }

        function submitForm(e) {
            e.preventDefault();
            axios
                .put(`/api/update/${id}`, user).then(res => {
                if (res.status === 200) {
                    alert('userdata updated!')
                    history.push('/users');
                }
            }).catch(function () {
                alert("Could not creat account. Please try again");
            });
        }

        function deleteUser(e) {
            e.preventDefault();
            axios
                .delete(`/api/delete/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        alert('User deleted');
                        history.push('/users');
                    }
                });
        }
        return (
            <>
                <Container>
                    <Link
                        to={`/users`}
                        title="Go Back"
                    >
                        <Button>Go Back</Button>
                    </Link>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" placeholder="Title"
                                          disabled={disabled}
                                          value={user.title}
                                          onChange={(e) => handleInputChange('title', e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Firstname:</Form.Label>
                            <Form.Control type="text" placeholder="FirstName"
                                          disabled={disabled}
                                          value={user.firstName}
                                          onChange={(e) => handleInputChange('firstName', e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Lastname:</Form.Label>
                            <Form.Control type="text" placeholder="LastName"
                                          disabled={disabled}
                                          value={user.lastName}
                                          onChange={(e) => handleInputChange('lastName', e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control type="email" placeholder="Email"
                                          disabled={disabled}
                                          value={user.email}
                                          onChange={(e) => handleInputChange('email', e)} required/>
                        </Form.Group>
                        {disabled ?
                            <Button variant="primary" onClick={() => setDisabled(!disabled)} disabled={!disabled}>
                                Modify
                            </Button> : <><Button variant="primary" type="submit"> submit </Button> &nbsp;
                                <Button variant="secondary" onClick={() => setDisabled(!disabled)}>
                                    Cancel
                                </Button></>}&nbsp;
                        <Button variant="danger" onClick={deleteUser}>Delete</Button>
                    </Form>

                </Container>
            </>
        )
    }
;
export default Detail