//Brady MacDonald

import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/Assignments.css";

const Assignments = (props) => {
  const formData = new FormData();

  const [submission, setSubmission] = useState({
    file: null,
    fileName: "",
    assignmentNum: "",
  });

  const onInputChange = (inputNum, e) => {
    setSubmission({ ...submission, file: e.target.files[0] });
    setSubmission({ ...submission, fileName: e.target.files[0].name });
    setSubmission({ ...submission, assignmentNum: inputNum });

    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    formData.append("assignmentNum", inputNum);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/upload_file", {
        assignmentNum: submission.assignmentNum,
        file: "file_content",
        fileName: "fileName",
      })
      .then((res) => {
        if (res.status === 200) {
          alert("response 200 OK");
        } else {
          alert("Error: ");
          alert(res.data.message);
        }
      })
      .catch((e) => {
        alert("Could not submit assignment. Please try again");
        alert(e);
      });
  };

  return (
    <Container>
      <Link to={`/`} title="Go Back">
        <Button variant="outline-primary mt-2 mb-2 ">Go Back</Button>
      </Link>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Assignment</th>
            <th scope="col">Submission</th>
            <th scope="col">Due Date</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Assignment 1</td>
            <td>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Control
                    type="file"
                    onChange={(e) => onInputChange("Assignment 1", e)}
                    required
                  />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Upload
                </Button>
              </Form>
            </td>
            <td>July-30th</td>
            <td>A+</td>
          </tr>
          <tr>
            <td>Assignment 2</td>
            <td>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Control
                    type="file"
                    onChange={(e) => onInputChange("Assignment 2", e)}
                    required
                  />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Upload
                </Button>
              </Form>
            </td>
            <td>August-4th</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Assignment 3</td>
            <td>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Control
                    type="file"
                    onChange={(e) => onInputChange("Assignment 3", e)}
                    required
                  />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Upload
                </Button>
              </Form>
            </td>
            <td>August-6th</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
export default Assignments;
