import React from "react";
import CreatePostModalScreen from "../screen/CreatePostModalScreen";
import ExploreScreen from "../screen/ExploreScreen";
import NotificationsScreen from "../screen/NotificationsScreen";
import PostDetailScreen from "../screen/PostDetailScreen";
import PostLikesScreen from "../screen/PostLikesScreen"; //pages/PostLikes";
import PostRepostsScreen from "../screen/PostRepostsScreen"; //pages/Posts PostReposts";
import SearchResultsScreen from "../screen/SearchResultsScreen";
import UserDetailScreen from "../screen/UserDetailScreen"; //pages/UserDetail";
import UserFollowersScreen from "../screen/UserFollowersScreen"; //pages/UserFollowings UserFollowers";
import UserFriendsScreen from "../screen/UserFriendsScreen"; //pages/UserFriends";
import HomeScreen from "../screen/HomeScreen"; //pages/Home";
import ProfileModalScreen from "../screen/ProfileModalScreen"; //pages/ProfileModal";
import LoginScreen from "../screen/LoginScreen"; //pages/Login";
import RegisterScreen from "../screen/RegisterScreen";
import { Col, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";

const RoutesApp = () => {
  return (
    <Row>
      <Col className="px-sm-4" sm="12" lg="8">
        <Col className="border">
          <Routes>
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/search" element={<SearchResultsScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/post/:postId/likes" element={<PostLikesScreen />} />
            <Route
              path="/post/:postId/reposts"
              element={<PostRepostsScreen />}
            />
            <Route path="/post/:postId" element={<PostDetailScreen />} />
            <Route
              path="/user/:username/friends"
              element={<UserFriendsScreen />}
            />
            <Route
              path="/user/:username/followers"
              element={<UserFollowersScreen />}
            />
            <Route path="/user/:username" element={<UserDetailScreen />} />
            <Route path="/settings/profile" element={<ProfileModalScreen />} />
            <Route path="/compose/post" element={<CreatePostModalScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
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
