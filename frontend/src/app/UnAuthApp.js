import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import ExploreScreen from "../screen/ExploreScreen";
import LoginScreen from "../screen/LoginScreen";
import PostDetailScreen from "../screen/PostDetailScreen";
import RegisterScreen from "../screen/RegisterScreen";
import { Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResultsScreen from "../screen/SearchResultsScreen";
import UserDetailScreen from "../screen/UserDetailScreen";

const UnAuthApp = () => {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Row>
          <Col
            className="mx-auto vh-100 sticky-top overflow-y-auto hide-scroll"
            xs
            lg="5"
          >
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
export default UnAuthApp;
