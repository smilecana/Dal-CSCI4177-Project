import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get(`/api/user/${props.data.id}`).then((response) => {
      return setUser(response.data.users);
    });
  }, [props.data.id]);

  return (
    <>
      <Container
        style={{
          backgroundColor: "#ffffff",
          opacity: "1",
          backgroundImage:
            "repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 17px ), repeating-linear-gradient( #f4f6fe55, #f4f6fe )",
          height: "100vh",
          maxWidth: "100%",
        }}>
        <Row>
          <h1 style={{ color: "" }} className="py-2 px-4">
            Hello, {props.data.email}
          </h1>
        </Row>
        <Row xs={1} md={2} lg={4} className="align-items-center">
          <Col>
            <Card className="my-1">
              <Card.Body>
                <Card.Title
                  className="p-2 rounded"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  Calendar
                </Card.Title>
                <Card.Text>Access your calendar here!</Card.Text>
                <Button variant="outline-primary" as={Link} to={"/calendar"}>
                  Go to Calendar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card className="my-1">
              <Card.Body>
                <Card.Title
                  className="p-2 rounded"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  Assignments
                </Card.Title>
                <Card.Text>Your assignments are here. Don't be late!</Card.Text>
                <Button variant="outline-primary" as={Link} to={"/assignments"}>
                  Go to Assingments
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card className="my-1">
              <Card.Body>
                <Card.Title
                  className="p-2 rounded"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  Grades
                </Card.Title>
                <Card.Text>You can see your grades here!</Card.Text>
                <Button variant="outline-primary" as={Link} to={"/grades"}>
                  Go to Grades
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card className="my-1">
              <Card.Body>
                <Card.Title
                  className="p-2 rounded"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  Profile
                </Card.Title>
                <Card.Text>
                  Here you can see and edit your profile. Keep it fresh!
                </Card.Text>
                <Button variant="outline-primary" as={Link} to={"/user/" + props.data.id}>
                  Go to Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
