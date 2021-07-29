import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/Grades.css";

const Grades = (props) => {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    axios.get("/api/retrieve_assignments", {
      params: {
        id: props.data.id
      }
    }).then((response) => {
      const info = response.data;

      console.log(info);
      return setAssignment(info.Assignment);
    });
  }, []);

  return (
    <Container
      style={{
        backgroundColor: "#ffffff",
        opacity: "1",
        backgroundImage: "repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 17px ), repeating-linear-gradient( #f4f6fe55, #f4f6fe )",
        height: "100vh",
        maxWidth: "100%",
      }}>
      <Link to={`/`} title="Go Back">
        <Button variant="outline-primary" className="mt-2 mb-2">
          Go Back
        </Button>
      </Link>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Assignment</th>
            <th scope="col">Submission</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignment.map((item) => (
            <tr>
              <td>{item.assignmentNum}</td>
              <td>{item.fileName}</td>
              <td>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
export default Grades;
