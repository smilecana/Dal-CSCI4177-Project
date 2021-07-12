import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Button, Card, Col, Container, Row,} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom";

const Users = () => {
        let history = useHistory();
        const [users, setUsers] = useState([]);
        useEffect(() => {
            axios
                .get("/users")
                .then(response => {
                    return setUsers(response.data.users)
                });
        }, []);

        function deleteUser(id) {
            axios
                .delete(`/delete/${id}`)
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
                        to={`/`}
                        title="Go Back"
                    >
                        <Button>Go Back</Button>
                    </Link>
                    {users.length === 0 ? <h2>No data</h2> :
                        <>
                            <br/>
                            <br/>
                            <Row xs={1} md={3} className="g-4">
                                {users.map(item =>
                                    <Col key={item._id}>
                                        <Card>
                                            <Card.Img variant="top" src={item.picture}/>
                                            <Card.Body>
                                                <Card.Title>{item.firstName + ' ' + item.lastName}</Card.Title>
                                                <Card.Text>Email: {item.email} </Card.Text>
                                                <Link
                                                    to={`/users/${item._id}`}
                                                    title="Go Detail"
                                                >
                                                    <Button>Go detail</Button>
                                                </Link>
                                                <Button variant="danger"
                                                        onClick={() => deleteUser(item._id)}>Delete</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </>}
                </Container>
            </>
        )
    }
;
export default Users