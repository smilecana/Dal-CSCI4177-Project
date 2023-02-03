import React, { Component } from "react";
import Modal from "../modal/calendarModal.js";
import Modal2 from "../modal/appointmentModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../assets/css/Calendar.css";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      //hide the modal until the user wants it to show
      show: false,
      events: [],
      show2: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal2 = this.showModal2.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
  }

  //for showing the modal
  showModal = () => {
    //need to set the state too true
    this.setState({ show: true });
  };
  //for hiding the modal
  hideModal = () => {
    //set to false
    this.getEvents();
    this.setState({ show: false });
  };

  componentDidMount() {
    this.getEvents();
  }

  showModal2 = () => {
    //need to set the state too true
    this.setState({ show2: true });
  };
  //for hiding the modal
  hideModal2 = () => {
    //set to false
    this.setState({ show2: false });
  };

  getEvents = () => {
    axios.get("/api/events").then((response) => {
      const info = response.data;
      this.setState({ events: info.events });
    });
  };
  render() {
    return (
      <Container
        style={{
          backgroundColor: "#ffffff",
          opacity: "1",
          backgroundImage:
            "repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 17px ), repeating-linear-gradient( #f4f6fe55, #f4f6fe )",
          height: "100vh",
          maxWidth: "100%",
        }}>
        <Link to={`/`} title="Go Back">
          <Button variant="outline-primary" className="mt-2 mb-2">
            Go Back
          </Button>
        </Link>
        <div id="calendar">
          <main>
            <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
            <button type="button" onClick={this.showModal}>
              Add Event
            </button>

            <Modal2
              show={this.state.show2}
              handleClose={this.hideModal2}></Modal2>
            <button type="button" onClick={this.showModal2}>
              Create an Appointment
            </button>

            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              events={this.state.events}
            />
          </main>
        </div>
      </Container>
    );
  }
}

export default Calendar;
