//Brady MacDonald
//B00719432

import axios from 'axios';
import React,{Component} from 'react';
import {Button, Container, Form,} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom";
import {Col, Row} from 'react-bootstrap';

class Assignments extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
        alert("onFileChange");
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
        alert("onFileUpload");
        
        // Create an object of formData
        const formData = new FormData();
    
        if (this.state.selectedFile) {
            // Update the formData object
            formData.append(
            "UserFile",
            this.state.selectedFile,
            this.state.selectedFile.name
            );

            // Details of the uploaded file
            console.log(this.state.selectedFile);
    
            // Request made to the backend api
            // Send formData object
            //axios.post("api/uploadfile", formData);
            axios.post("api/uploadfile", formData).then(res => {
                if (res.status === 200) {
                    alert('file uploaded success!');
                    //history.push('/users');
                }
                else {alert("failure");}
                }).catch(function () {
                    alert("Could not upload submission. Please try again");
                });
        }
        else{
            alert("Select a file before uploading. ");
        }
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {
        return (
            <div>
                <h2>File Details:</h2>     
                <p>File Name: {this.state.selectedFile.name}</p>   
                <p>File Type: {this.state.selectedFile.type}</p>           
                <p>
                    Last Modified:{" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
        );
        } else {
            return (
                <div>
                    <br />
                </div>
            );
        }
    };
    
    render() {
        return (
            <Container>
                <Link to={`/home`} title="Go Back">
                    <Button>Go Back</Button>
                </Link>

                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h3>Assignment</h3>
                        </div>
                        <div class="col-6">
                            <h3>Submission</h3>
                        </div>
                        <div class="col">
                            <h3>Due Date</h3>
                        </div>
                        <div class="col">
                            <h3>Grade</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Assignent #1
                        </div>
                        <div class="col-6">
                            <div>
                                <input type="file" onChange={this.onFileChange} />
                                <button onClick={this.onFileUpload}>Upload!</button>
                            </div>
                        </div>
                        <div class="col">
                            today
                        </div>
                        <div class="col">
                            A+
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Assignent #2
                        </div>
                        <div class="col-6">
                            <div>
                                <input type="file" onChange={this.onFileChange} />
                                <button onClick={this.onFileUpload}>Upload!</button>
                            </div>
                        </div>
                        <div class="col">
                            today
                        </div>
                        <div class="col">
                            B+
                        </div>
                    </div>
                </div>
                {this.fileData()}
            </Container>
      );
    }
  }
 
  export default Assignments;