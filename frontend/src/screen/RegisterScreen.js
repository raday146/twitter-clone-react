import React, { useState, useEffect } from "react";
import { Col, Figure, Form, Row } from "react-bootstrap";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/RegisterScreenStyle";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../utils/apiClient";
import FormContainer from "../components/FormContainer";
import Splash from "../components/Splash";
import { useAuthUser } from "../context/authContext";

const RegisterScreen = ({ classes, location }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuthUser();
  const redirect = location?.search ? location.search.split("=")[1] : "/login";
  /*const registerMutation = useMutation(signup, {
    onSuccess: () => queryClient.invalidateQueries("AuthProvider"),
  });*/
  useEffect(() => {
    if (!!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const name = e.target.elements.name.value;
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const ConfirmPassword = e.target.elements.ConfirmPassword.value;
      if (!!!name && !!!password && !!!email) {
        setError("The fields must be filled");
      } else {
        if (!!!name) {
          setError("name field must be filled");
        } else if (!!!email) {
          setError("email field must be filled");
        } else if (!!!password || !!!ConfirmPassword) {
          setError("password field must be filled");
        }
        if (password === ConfirmPassword) {
          await signUp(name, email, password);

          // registerMutation.mutate(name, email, password);
        } else {
          setError(
            "Password and confirm password are not the same, please try again!"
          );
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row>
      {loading && <Splash />}
      <Col className={`${classes.root} mx-auto border px-3 pb-3`}>
        <Figure className="d-flex flex-column align-items-center">
          <Figure.Image
            style={{ padding: "2em" }}
            width={200}
            height={200}
            src="/img/twitter-splash.png"
            alt="Twitter Logo"
          />
        </Figure>
        <h5 className="font-weight-bolder">See what’s happening now.</h5>
        <fieldset disabled={loading}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>
                Choose a username -{" "}
                <small className="text-muted">required</small>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                autoCapitalize="off"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>
                E-mail - <small className="text-muted">optional</small>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                autoCapitalize="on"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>
                Choose a password -{" "}
                <small className="text-muted">required</small>
              </Form.Label>
              <Form.Control type="password" name="password"></Form.Control>
            </Form.Group>
            <Form.Group controlId="ConfirmPassword" className="my-2">
              <Form.Label>
                Confirm your password -{" "}
                <small className="text-muted">required</small>
              </Form.Label>
              <Form.Control
                type="password"
                name="ConfirmPassword"
              ></Form.Control>
            </Form.Group>
            <p className="mt-n2">
              <small>
                Already have an account? <Link to="/login">Log in instead</Link>
              </small>
              <br />
              <small className="text-danger">{error}</small>
            </p>
            <div className="d-flex flex-column align-items-center">
              <button
                type="submit"
                className={`${classes.button} btn btn-outline-primary rounded-pill`}
              >
                <span>Sign up</span>
              </button>
              <div className="seperator">
                <span>or</span>
              </div>
              <Link
                to="/login"
                className={`${classes.button} btn btn-primary  rounded-pill`}
              >
                <span>Log in</span>
              </Link>
            </div>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default withStyles(styles)(RegisterScreen);
