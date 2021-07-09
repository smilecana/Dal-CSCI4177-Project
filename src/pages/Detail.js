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
            'firstname': '',
            'lastname': '',
            'email': '',
            'password': '',
            'errors': {'firstname': false, 'lastname': false, 'email': false, 'password': false, 'confirmPwd': false}
        });
        useEffect(() => {
            axios
                .get(`/api/users/${id}`)
                .then(res => {
                    console.log(res.data);
                    return setUser({...res.data});
                });
        }, []);
        const handleInputChange = (keyName, e) => {
            if (keyName === 'firstname' || keyName === 'lastname') {
                let regex = new RegExp(/^[a-zA-Z0-9]*$/); //check the alpha-numeric characters.
                if (!regex.test(e.target.value)) {
                    setUser({...user, 'errors': {...user.errors, [keyName]: true}});
                    return;
                }
            } else if (keyName === 'email') {
                let regex = new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/); //Check the email validation.
                if (!regex.test(e.target.value)) {
                    setUser({...user, 'errors': {...user.errors, [keyName]: true}});
                    return;
                }
            }
            setUser({...user, [keyName]: e.target.value, 'errors': {...user.errors, [keyName]: false}});
        }

        function submitForm(e) {
            e.preventDefault();
            axios
                .put(`/api/users/${id}`, user).then(res => {
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
                .delete(`/api/users/${id}`)
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
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Firstname:</Form.Label>
                            <Form.Control type="text" placeholder="FirstName"
                                          disabled={disabled}
                                          value={user.firstname}
                                          onChange={(e) => handleInputChange('firstname', e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Lastname:</Form.Label>
                            <Form.Control type="text" placeholder="LastName"
                                          disabled={disabled}
                                          value={user.lastname}
                                          onChange={(e) => handleInputChange('lastname', e)} required/>
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