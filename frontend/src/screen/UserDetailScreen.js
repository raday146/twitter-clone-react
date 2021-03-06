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
import { withStyles } from "@material-ui/styles";
import { formatDate } from "../utils/date";
import { useQueryClient } from "react-query";
import { getUserById } from "../utils/apiClient";
import styles from "../styles/UserDetailScreenStyle";
import { useNavigate } from "react-router-dom";

const UserDetailScreen = ({ classes }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useAuthUser();
  const data = queryClient.getQueryData("User-posts");
  const {
    data: user,
    loading,
    isSuccess,
  } = useQuery(["UserDetail", userId], getUserById);
  const posts = data;

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!user) {
    return <div className="message font-weight-bold">User not found</div>;
  }

  const isAuthUser = currentUser?.user?.name === user?.name;
  const expanded_url = user?.urls && user.urls.length > 0 ? user.urls[1] : "";
  const url = user?.urls ? user.urls[0] : "";

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Heading title={user?.name} backButton />
      <Figure
        style={{
          height: "200px",
          width: "100%",
          backgroundImage: `url(${user?.banner})`,
        }}
      />
      <div className="p-3 border-bottom">
        <Row className="d-flex justify-content-between mt-n2 px-2 align-items-center w-100">
          <Figure
            style={{ height: "100px", width: "100px" }}
            className="mt-n5 rounded-circle overflow-hidden bg-primary"
          >
            <Figure.Image className="w-200 h-100" src={user?.avatar} />
          </Figure>
          {isAuthUser ? (
            <Link
              className={`${classes.btnEdit} btn btn-outline-primary my-3 center rounded-pill`}
              to="/settings/profile"
            >
              Edit profile
            </Link>
          ) : (
            <Col>
              <FollowButton user={user} />
            </Col>
          )}
        </Row>
        <div className="flex flex-column">
          <h5 className="mb-0">
            <b>{user?.name}</b>
          </h5>
          <div className="text-muted">@{user?.name}</div>
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
              <span className="ml-1">{user?.location || "Unknown"}</span>
            </div>
          </Col>
          <Col sm="6" lg="4" className="px-2 mb-1">
            <div className="d-flex text-muted align-items-top">
              <FontAwesomeIcon
                className="mt-1"
                icon={faDate}
                style={{ fontSize: "1em" }}
              />
              <span className="ml-1">Joined {formatDate(user?.createdAt)}</span>
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
          <Link to={`/user/${user?._id}/followers`} className="text-muted mr-2">
            {user.numFollowers} <span>Followers</span>
          </Link>
          <Link to={`/user/${user?._id}/friends`} className="text-muted mr-2">
            {user.numFollowing} <span>Following</span>
          </Link>
        </Row>
      </div>
      <h5 className="m-2 pb-2 border-bottom">
        {posts && posts.length} <span className="text-muted">Posts</span>
      </h5>
      <PostsList posts={posts} isSuccess={isSuccess} />
    </>
  );
};

export default withStyles(styles)(UserDetailScreen);
