import React from "react";
import "../../assets/css/Admin.css";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import axios from "axios";

const UserNoticeModal = (props) => {
    const deleteUser = () => {
        axios
            .delete(`/api/user/${props.user._id}`, props.user)
            .then((res) => {
                if (res.status === 200) {
                    props.handleClose(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
    return (
        <>
            <Modal size="sm" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <Modal.Body>
                    <h5>Do you want to delete account?</h5>
                    <h5 className='danger'>Name:  {props.user.userName}</h5>
                    <h5 className='danger'>Email: {props.user.email}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};
export default UserNoticeModal;
