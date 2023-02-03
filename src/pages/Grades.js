import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
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
      return setAssignment(info.Assignment);
    });
  }, []);

  return (
    <Container
      style={{
        backgroundColor: "#ffffff",
        opacity: "1",
        height: "100vh",
        maxWidth: "100%",
      }}>
      <Link to={`/`} title="Go Back">
        <Button variant="outline-primary" className="mt-2 mb-2">
          Go Back
        </Button>
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Assignment</th>
            <th scope="col">Submission</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignment && assignment.length > 0 ? (assignment.map((item) => (
            <tr>
              <td>{item.assignmentNum}</td>
              <td>{item.fileName}</td>
              <td>{item.grade}</td>
            </tr>
          ))):(<tr><td colSpan={3}>No data</td></tr>)}
        </tbody>
      </table>
    </Container>
  );
};
export default Grades;
