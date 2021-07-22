
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Button, Container, Form,} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../assets/css/Grades.css'

const Grades = (props) => {
    
   
    const [assignment, setAssignment] = useState([]);

    useEffect(() => {
        axios.get('/api/retrieve_assignments')
        .then((response) =>{
            const info =response.data;
            
            console.log(info)
            return setAssignment(info.Assignment)
        })
     },[]);


    return (
        <Container >
            <Link to={`/`} title="Go Back">
                <Button>Go Back</Button>
            </Link>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Assignment</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>
                <tbody>
                {assignment.map(item =>
                    <tr>
                        <td>{item.fileName}</td>
                        <td>{item.grade}</td>
                    </tr>
                )}

                </tbody>
            </table>
        </Container>
    )
};
export default Grades;