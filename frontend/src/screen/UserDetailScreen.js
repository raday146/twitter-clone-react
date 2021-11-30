import React, { useEffect } from "react";
import { faCalendarAlt as faDate } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faLocationArrow as faLocation } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowButton from "../components/FollowButton";
import Heading from "../components/Heading";
import PostsList from "../components/PostsList";
import WithUrls from "../components/WithUrls";
import { Col, Figure, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthUser } from "../context/authContext";
import { getUserTimeline } from "../utils/apiClient";
import { formatDate } from "../utils/date";

const UserDetailScreen = () => {
  const { username } = useParams();
  const { data, isLoading, isSuccess } = useQuery(
    ["UserDetail", username],
    () => getUserTimeline(username)
  );
  const { currentUser } = useAuthUser();

  const user = data?.user;
  const posts = data?.posts;

  useEffect(() => {
    if (isLoading) {
      return <Spinner />;
    }
  }, [isLoading]);

  if (!user) {
    return <div className="message font-weight-bold">User not found</div>;
  }

  const isAuthUser = currentUser.user.name === user.name;
  const expanded_url = user.urls[0];
  const url = user.urls[0];

  return (
    <>
      <Heading title={user.name} backButton />
      <Figure
        style={{
          height: "200px",
          width: "100%",
          backgroundImage: `url(${user.banner})`,
        }}
      />
      <div className="p-3 border-bottom">
        <Row className="d-flex justify-content-between mt-n2 px-2 align-items-center w-100">
          <Figure
            style={{ height: "100px", width: "100px" }}
            className="mt-n5 rounded-circle overflow-hidden bg-primary"
          >
            <Figure.Image className="w-100 h-100" src={user.avatar} />
          </Figure>
          {isAuthUser ? (
            <Link
              className="btn btn-outline-primary px-3 rounded-pill font-weight-bold"
              to="/settings/profile"
            >
              Edit profile
            </Link>
          ) : (
            <FollowButton user={user} />
          )}
        </Row>
        <div className="flex flex-column">
          <h5 className="mb-0">
            <b>{user.name}</b>
          </h5>
          <div className="text-muted">@{user.name}</div>
        </div>
        <blockquote
          style={{ maxHeight: "300px" }}
          className="my-1 overflow-y-auto"
        >
          <WithUrls>{user.bio}</WithUrls>
        </blockquote>
        <Row className="d-flex justify-content-between mt-2">
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1"
                icon={faLocation}
                style={{ fontSize: "1em" }}
              />
              <span className="ml-1">{user.location || "Unknown"}</span>
            </div>
          </Col>
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1"
                icon={faDate}
                style={{ fontSize: "1em" }}
              />
              <span className="ml-1">Joined {formatDate(user.createdAt)}</span>
            </div>
          </Col>
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1 mr-1"
                icon={faLink}
                style={{ fontSize: "1em" }}
              />
              <WithUrls>{expanded_url || url}</WithUrls>
            </div>
          </Col>
        </Row>
        <Row className="d-flex my-2">
          <Link to={`/user/${user.name}/followers`} className="text-muted mr-2">
            {user.followersCount} <span>Followers</span>
          </Link>
          <Link to={`/user/${user.name}/friends`} className="text-muted mr-2">
            {user.friendsCount} <span>Following</span>
          </Link>
        </Row>
      </div>
      <h5 className="m-2 pb-2 border-bottom">
        {user.statusesCount} <span className="text-muted">Posts</span>
      </h5>
      <PostsList posts={posts} isSuccess={isSuccess} />
    </>
  );
};

export default UserDetailScreen;
