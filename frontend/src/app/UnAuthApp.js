import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import ExploreScreen from "../screen/ExploreScreen";
import LoginScreen from "../screen/LoginScreen";
import PostDetailScreen from "../screen/PostDetailScreen";
import RegisterScreen from "../screen/RegisterScreen";
import { Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { Routes, Route } from "react-router-dom";
import SearchResultsScreen from "../screen/SearchResultsScreen";
import UserDetailScreen from "../screen/UserDetailScreen";

const UnAuthApp = () => {
  //      <Navbar />

  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs="12" lg="7">
            <Routes>
              <Route path="/signup" element={<RegisterScreen />} />
              <Route path="/search" element={<SearchResultsScreen />} />
              <Route path="/post/:postId" element={<PostDetailScreen />} />
              <Route path="/user/:username" element={<UserDetailScreen />} />
              <Route path="/" element={<LoginScreen />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
/** on the first route of singup
 * <MediaQuery maxWidth={992}>
                  <RegisterScreen />
                </MediaQuery>
                <MediaQuery minWidth={993}>
                  <ExploreScreen noSearchBar />
                </MediaQuery>

    on the first route of login
                  <MediaQuery maxWidth={992}>
                  <LoginScreen />
                </MediaQuery>
                <MediaQuery minWidth={993}>
                  <ExploreScreen noSearchBar />
                </MediaQuery>

     on the second Col   <MediaQuery minWidth={993}>
            <Col
              className="mx-auto vh-100 sticky-top overflow-y-auto hide-scroll"
              xs
              lg="5"
            >
 */
export default UnAuthApp;
