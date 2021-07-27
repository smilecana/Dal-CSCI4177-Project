//Brady MacDonald

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, CloseButton, Container, Form, Table,} from 'react-bootstrap';
import '../../assets/css/Admins.css'
import {Link} from "react-router-dom";

const UserLists = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/users')
            .then(res => {
                const userData = res.data;
                return setUsers(userData.users)
            })
    }, [])
    return (
        <Container className='wrap-users'>
            <div className='btn-group-users'>
                <Link
                    to={`/admin/user/add`}
                    title="View"
                >
                <Button variant="primary">+Add</Button>
                </Link>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>UserName</th>
                    <th>UserEmail</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ?
                    <>
                        {users.map((item, idx) =>
                            <tr key={idx + 1}>
                                <td>{idx + 1}</td>
                                <td>{(item.type === '0') ? 'Admin' : (item.type === '1')?'Student':'Instructor'}</td>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>
                                    <div className='btn-group-action'>
                                        <Link
                                            to={`/admin/users/${item._id}`}
                                            title="View"
                                        >
                                            <Button variant="outline-primary">View</Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </> : <h2>
                        No data
                    </h2>}
                </tbody>
            </Table>
        </Container>
    )
};
export default UserLists;