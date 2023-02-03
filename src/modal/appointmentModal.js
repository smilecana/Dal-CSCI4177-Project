//Ryan McInroy
import axios from 'axios';
import { useState } from 'react';
import './modal.css';
import { Form } from "react-bootstrap";

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
  
  //submitting the form
  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/event", {
        name: event.name,
        time: event.time,
        description: event.description
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
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
        <button type="submit" onClick={onSubmit}>Submit</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;