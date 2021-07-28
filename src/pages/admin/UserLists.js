//Brady MacDonald

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, Container, Table,} from 'react-bootstrap';
import '../../assets/css/Admin.css'
import UserManageModal from "./UserManageModal";
import UserNoticeModal from "./UserNoticeModal";

const UserLists = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [type, setType] = useState(0); // 0: add, 1: edit
    const [showDel, setShowDel] = useState(false);
    const [show, setShow] = useState(false);
    const [err, setErr] = useState({
        userName: false,
        email: false,
        password: false,
        confirmPwd: false,
    });
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('/api/admin/users')
            .then(res => {
                const userData = res.data;
                return setUsers(userData.users)
            })
    }
    const showModal = (type, id = '') => {
        const filterUser = users.filter(user => user._id === id);
        setUser(filterUser[0]);
        if (type === 'delete') {
            return setShowDel(true);
        } else if (type === 'edit') {
            setType(1);
        } else {
            setUser({});
            setType(0);
        }
        return setShow(true);
    }
    const closeModal = () => {
        getData();
        return setShow(false);
    }
    const closeDelModal = () => {
        getData()
        return setShowDel(false);
    }
    const handleInputChange = (keyName, e) => {
        if (keyName === "userName") {
            let regex = new RegExp(/^[a-zA-Z0-9]*$/); //check the alpha-numeric characters.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        } else if (keyName === "email") {
            let regex = new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/); //Check the email validation.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        } else if (keyName === "password") {
            let regex = new RegExp(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/
            ); //It allows alphabets, special characters, and at least 8 characters.
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
        if (keyName === "type") {
            setUser({
                ...user,
                [keyName]: e.target.id.substr(e.target.id.length - 1),
            });
        }
        setErr({...err, [keyName]: false});
    };
    return (
        <Container className='wrap-users'>
            <div className='btn-group-users'>
                <Button variant="primary" onClick={() => showModal('add')}>+Add</Button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>UserName</th>
                    <th>UserEmail</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ?
                    <>
                        {users.map((item, idx) =>
                            <>
                                <tr key={idx + 1}>
                                    <td>{idx + 1}</td>
                                    <td>{(item.type === '0') ? 'Admin' : (item.type === '1') ? 'Student' : 'Instructor'}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{(item.password && item.password !== '') ? 'Active' : 'Pending'}</td>
                                    <td>
                                        <div className='btn-group-action'>
                                            <Button variant="link" onClick={() => showModal('edit', item._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pencil-square"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fillRule="evenodd"
                                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="link" onClick={() => showModal('delete', item._id)}
                                                    disabled={item.type === 0}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd"
                                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </>)
                        }
                    </> : <h2>
                        No data
                    </h2>}
                </tbody>
            </Table>
            <UserManageModal show={show} user={user} type={type}
                             handleClose={closeModal}
                             handleInput={handleInputChange}
                             err={err}
            />
            <UserNoticeModal show={showDel} handleClose={closeDelModal} user={user}/>
        </Container>
    )
}

export default UserLists;