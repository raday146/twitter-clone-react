import React from "react";
import CreatePostModal from "pages/CreatePostModal";
import Explore from "pages/Explore";
import Notifications from "pages/Notifications";
import PostDetail from "pages/PostDetail";
import PostLikes from "pages/PostLikes";
import PostReposts from "pages/PostReposts";
import SearchResults from "pages/SearchResults";
import UserDetail from "pages/UserDetail";
import UserFollowers from "pages/UserFollowers";
import UserFriends from "pages/UserFriends";
import Home from "pages/Home";
import ProfileModal from "pages/ProfileModal";
import { Col, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import Sidebar from "components/Sidebar";
import { Routes, Route } from "react-router-dom";

const RoutesApp = () => {
  return (
    <Row>
      <Col className="px-sm-4" sm="12" lg="8">
        <Col className="border">
          <Routes>
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/post/:postId/likes" element={<PostLikes />} />
            <Route path="/post/:postId/reposts" element={<PostReposts />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/user/:username/friends" element={<UserFriends />} />
            <Route
              path="/user/:username/followers"
              element={<UserFollowers />}
            />
            <Route path="/user/:username" element={<UserDetail />} />
            <Route path="/settings/profile" element={<ProfileModal />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Route path="/compose/post" element={<CreatePostModal />} />
        </Col>
      </Col>

      <MediaQuery minWidth={992}>
        <Col lg="4" className="vh-100 overflow-y-auto hide-scroll sticky-top">
          <Sidebar />
        </Col>
      </MediaQuery>
    </Row>
  );
};

export default RoutesApp;
