import React, { useState, useEffect } from "react";
import { Col, Figure, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/apiClient";
import { useMutation, useQueryClient } from "react-query";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/RegisterScreenStyle";
import { validate } from "../utils/validate";

const LoginScreen = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const queryClient = useQueryClient();
  //const user = queryClient.getQueryCache().get("AuthProvider");
  //const navigate = useNavigate();
  //const loggedin = useMutation(login, {onSuccess: () => queryClient.invalidateQueries("AuthProvider"),});

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      if (!!!email && !!!password) {
        setError("Fields must be filled");
      } else if (!!!email) {
        setError("Email field must be filled");
      } else if (!!!password) {
        setError("Password field must be filled");
      } else {
        //loggedin.mutate({ email, password });
        login({ email, password });
        console.log("loginn");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Col className={`${classes.root} mx-auto border px-3 pb-3 `}>
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
              className={`${classes.button} btn btn-outline-primary rounded-pill`}
            >
              Log in
            </button>
            <small className="text-muted m-2">or</small>
            <Link
              to="/signup"
              className={`${classes.button} btn btn-primary  rounded-pill`}
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
