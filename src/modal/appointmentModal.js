//Ryan McInroy
import axios from 'axios';
import { useState } from 'react';
import './modal.css';
import { Button, Container, Form } from "react-bootstrap";

const Modal = ({ handleClose, show, children, onEventAdded }) => {
  //css will depend on if the modal is showing or not
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  

  //setting the const of the form. These are the attributes we need.
  const [input, setInput] = useState({
    name: '',
    time: '',
    description: ''
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
  //for when the button is clicked. Console log shows values.
  function handleClick(event) {
    event.preventDefault();
    //In the console we can now see the values that are ready to be sent off.
    console.log(input);
  }

  //submitting the form
  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/add_event", {
        name: event.name,
        time: event.time,
        description: event.description
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          localStorage.setItem("lmsToken", response.data.token);
          window.location = "/";
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
          <h1>Create an Appointment</h1>
          <label>Who would you like to make an appointment with?</label>
          <input onChange={handleChange} name="name" value={input.name}></input>
          <br/>
          <label>Time:</label>
          <input onChange={handleChange} name="date" value={input.date}></input>
          <br/>
          <label>Description:</label>
          <input onChange={handleChange} name="date" value={input.date}></input>
          <br/>
        </Form>
        <button type="submit" onClick={handleClick, onSubmit}>Submit</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;