import React, { useEffect, useContext } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants"
import { AppContext } from "../context/userContext"

const Home = () => {
  let navigate = useNavigate();
  const {
    state: { authenticated, currentUser },
  } = useContext(AppContext);

  useEffect(() => {
    if (!authenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, []);

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
            Hello, {currentUser.email}
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
                <Button variant="outline-primary" as={Link}  to={"/profile"}>
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
