//Ryan McInroy
import axios from 'axios';
import React, {useState} from 'react';
import './modal.css';
import {Form} from "react-bootstrap";

const Modal = ({handleClose, show, children, onEventAdded}) => {
    //css will depend on if the modal is showing or not
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    //setting the const of the form. These are the attributes we need.
    const [input, setInput] = useState({
        title: '',
        date: ''
    })

    //allows for the values to be assigned
    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    //submitting the form
    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/api/event/", input)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.message);
                    handleClose();
                }
            })
            .catch((e) => {
                alert(e.response.data.error);
            });
    }


    //below is the form for creating the event and collecting the data.
    //inputs have the fuction handleChange assigned to them and the buttons with the respectful fuctions.
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <Form>
                    <h1>Create an Event</h1>
                    <label>Event Name:</label>
                    <input onChange={handleChange} name="title" value={input.title}/>
                    <br/>
                    <label>Date:</label>
                    <input onChange={handleChange} name="date" value={input.date}/>
                    <br/>
                </Form>
                <button type="submit" onClick={onSubmit}>Submit</button>
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;