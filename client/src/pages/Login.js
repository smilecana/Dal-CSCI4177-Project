import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants"
import { AppContext } from "../context/userContext"
import * as ActionTypes from "../utils/actionTypes"
import jwtDecode from "jwt-decode"
import axios  from "../configs/axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import "../assets/css/SignIn.css";


const Login = () => {
  useEffect(() => {
    if (authenticated) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [])

  const {
    state: { authenticated },
    dispatch,
  } = useContext(AppContext);
  
  let navigate = useNavigate();

  const [user, setUser] = useState({})
  const [err, setErr] = useState({
    email: false,
    password: false,
  });
  const handleInputChange = (keyName, e) => {
    if (keyName === "email") {
      let regex = new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/); //Check the email validation.
      if (!regex.test(e.target.value)) {
        setErr({ ...err, [keyName]: true });
        return;
      }
    } else if (keyName === "password") {
      let regex = new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/
      ); //It allows alphabets, special characters, and at least 8 characters.
      if (!regex.test(e.target.value)) {
        setErr({ ...err, [keyName]: true });
        return;
      }
    }
    setUser({ ...user, [keyName]: e.target.value });
    setErr({ ...err, [keyName]: false });
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          const decoded = jwtDecode(data.token);
          dispatch({ type: ActionTypes.SET_TOKEN, data: data.token });
          dispatch({ type: ActionTypes.SET_CURRENT_USER, data: decoded });
          dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
          navigate(ROUTES.HOMEPAGE);
        }
      })
      .catch((e) => {
        alert(e.response.message);
      });
  };
  return (
    <>
      <Container className="wrap">
        <h2>Sign in</h2>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              isInvalid={!!err.email}
              onChange={(e) => handleInputChange("email", e)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={!!err.password}
              onChange={(e) => handleInputChange("password", e)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Card className="register-box">
            <Card.Body>
              New to LMS Platform?{" "}
              <Link to="/signup">
                <Card.Link href="#">Create an account</Card.Link>
              </Link>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </>
  );
};
export default Login;
