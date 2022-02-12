import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import ExploreScreen from "../screen/ExploreScreen";
import LoginScreen from "../screen/LoginScreen";
import PostDetailScreen from "../screen/PostDetailScreen";
import RegisterScreen from "../screen/RegisterScreen";
import { Col, Container, Row } from "react-bootstrap";
//import MediaQuery from "react-responsive";
import { Routes, Route } from "react-router-dom";
import SearchResultsScreen from "../screen/SearchResultsScreen";
import UserDetailScreen from "../screen/UserDetailScreen";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/RegisterScreenStyle";

const UnAuthApp = ({ classes }) => {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Row>
          <Col className={`mt-5 ${classes.tmpImg} `}>
            <img
              width={"100%"}
              height={550}
              src="/img/twitter-home.png"
              alt="Twitter Logo"
            />
          </Col>
          <Col className={` sticky-top  hide-scroll" xs lg="5"`}>
            <Routes>
              <Route path="/signup" element={<RegisterScreen />} />
              <Route path="/search" element={<SearchResultsScreen />} />
              <Route path="/explore*" element={<ExploreScreen />} />
              <Route path="/user/:userId" element={<UserDetailScreen />} />
              <Route path="/post/:postId" element={<PostDetailScreen />} />
              <Route path="/" element={<LoginScreen />}>
                <Route path="/login" element={<LoginScreen />} />
              </Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
//
export default withStyles(styles)(UnAuthApp);
