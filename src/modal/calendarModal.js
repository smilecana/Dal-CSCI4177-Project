//Ryan McInroy
import axios from 'axios';
import { useState } from 'react';
import './modal.css';

const Modal = ({ handleClose, show, children, onEventAdded }) => {
  //css will depend on if the modal is showing or not
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  
  //setting the const of the form. These are the attributes we need.
  const [input, setInput] = useState({
    name: '',
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
  //for when the button is clicked. Console log shows values.
  function handleClick(event) {
    event.preventDefault();
    //In the console we can now see the values that are ready to be sent off.
    console.log(input);
  }

  //submitting the form
  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/addEvent', {
      name: event.name,
      date: event.date
    }).then(response => {
      alert(response.data.message);
      localStorage.setItem('lmsToken', response.data.token);
      
    })
  }
 

  //below is the form for creating the event and collecting the data.
  //inputs have the fuction handleChange assigned to them and the buttons with the respectful fuctions.
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <form>
          <h1>Create an Event</h1>
          <label>Event Name:</label>
          <input onChange={handleChange} name="name" value={input.name}></input>
          <br/>
          <label>Date:</label>
          <input onChange={handleChange} name="date" value={input.date}></input>
          <br/>
        </form>
        <button type="submit" onClick={handleClick, onSubmit}>Submit</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;