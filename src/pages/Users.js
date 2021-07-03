import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {
    Table, Container, InputGroup,InputGroupAddon, InputGroupText, Input
} from 'reactstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get("/api/users")
            .then(response => {
                return setUsers(response.data)
            });
    }, []);
    return (
        <>
            <Container>
                <br />
                <InputGroup>
                    <InputGroup>
                        <Input placeholder="FirstName and LastName" />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>Search</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </InputGroup>
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map(item =>
                        <tr key={item.email}>
                            <td>{item.objectId}</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td> {item.email} </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>
        </>
    )
};
export default Users