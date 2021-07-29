import React, { Component, useState, useEffect } from "react";
import Modal from "../modal/calendarModal.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../assets/css/Calendar.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      //hide the modal until the user wants it to show
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  //for showing the modal
  showModal = () => {
    //need to set the state too true
    this.setState({ show: true });
  };
  //for hiding the modal
  hideModal = () => {
    //set to false
    this.setState({ show: false });
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
          <Button variant="outline-primary mt-2 mb-2 ">Go Back</Button>
        </Link>
        <div id="calendar">
          <main>
            <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
            <button type="button" onClick={this.showModal}>
              Add Event
            </button>
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              events={[{ title: "Canada Day", date: "2021-07-01" }]}
            />
          </main>
        </div>
      </Container>
    );
  }
}

export default Calendar;
