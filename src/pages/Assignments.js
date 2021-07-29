//Brady MacDonald

import axios from 'axios';
import React from 'react';
import {Button, Container, Form,} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../assets/css/Assignments.css'

const Assignments = (props) => {
    
    const formData = new FormData();

    const onInputChange = (inputNum, e) => {
        formData.append("id", props.data.id);
        formData.append("file", e.target.files[0]);
        formData.append("fileName", e.target.files[0].name);
        formData.append("assignmentNum", inputNum);
    }

    const onSubmit = (e) =>  {
        e.preventDefault();
        
        axios.post('/api/upload_file', formData
        ).then(res => { 
            if (res.status === 200) {
                alert("Assignment submitted");
            }
            else {
                alert("Error : ");
                alert(res.data.message);
            }
        }).catch(e => {
            alert("Could not submit assignment. Please try again");
            alert(e);
        });
    }

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
            <Button variant="outline-primary mt-2 mb-2 ">Go Back</Button>
        </Link>
  
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Assignment</th>
                            <th scope="col">Submission</th>
                            <th scope="col">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Assignment 1</td>
                        <td>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Control type="file" name="file" id="file" enctype="multipart/form-data"
                                      onChange={(e) => onInputChange("Assignment 1", e)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Upload
                                </Button>
                            </Form>
                        </td> 
                        <td>July-30th</td>
                    </tr>
                    <tr>
                        <td>Assignment 2</td>
                        <td>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Control type="file" name="file" id="file" enctype="multipart/form-data"
                                      onChange={(e) => onInputChange("Assignment 2", e)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Upload
                                </Button>
                            </Form>
                        </td> 
                        <td>August-4th</td>
                    </tr>
                    <tr>
                        <td>Assignment 3</td>
                        <td>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Control type="file" name="file" id="file" enctype="multipart/form-data"
                                      onChange={(e) => onInputChange("Assignment 3", e)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Upload
                                </Button>
                            </Form>
                        </td> 
                        <td>August-6th</td>
                    </tr>
                    </tbody>
                </table>
        </Container>
    );
};
export default Assignments;