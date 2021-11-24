import React, { useState, useEffect } from "react";
import { Col, Figure, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../utils/api-client";
import { withStyles } from "@mui/material/styles";
import styles from "../styles/RegisterScreenStyle";
import { validate } from "../utils/validate";

const LoginScreen = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Col className={`${classes.root} mx-auto border px-3 pb-3`}>
      <Figure className="d-flex flex-column align-items-center">
        <Figure.Image
          width={200}
          height={200}
          style={{ padding: "2em" }}
          src="/img/twitter-splash.png"
          alt="Twitter Logo"
        />
      </Figure>
      <h5 className="font-weight-bolder">See what’s happening now.</h5>
      <fieldset disabled={loading}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              autoCapitalize="off"
            />
          </Form.Group>
          <Form.Group className="mb-0" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoCorrect="off"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <p>
            <small>
              <Link to="/help">Forgot password?</Link>
            </small>
            <br />
            <small className="text-danger">{error}</small>
          </p>
          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              variant="primary"
              className="btn btn-outline-primary btn-block rounded-pill font-weight-bold"
            >
              Log in
            </button>
            <small className="text-muted m-2">or</small>
            <Link
              to="/signup"
              className="btn btn-primary btn-block rounded-pill font-weight-bold"
            >
              Sign up
            </Link>
          </div>
        </Form>
      </fieldset>
    </Col>
  );
};

export default withStyles(styles)(LoginScreen);
