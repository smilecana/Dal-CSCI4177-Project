import { Col, Container, Row } from "reactstrap";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import React from "react";

const Home = () => {
  return (
    <>
      <Container>
        <Row><h1>Hello (add username here)</h1></Row>
        <Row xs={1} md={2} lg={4} className="align-items-center">
          <Col className="mt-2">
            <Card>
              <Card.Body>
                <Card.Title>Course Content</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-2">
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>Assignments</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-2">
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>Grades</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-2">
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="outline-primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
