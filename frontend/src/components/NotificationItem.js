import PostText from "./PostText";
import QuotePost from "./QuotedPost";
import React from "react";
import { Figure, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import { readNotification } from "../utils/apiClient";

export default function NotificationItem({ notification }) {
  const { currentUser } = useAuthUser();

  const handleReadNotification = async () => {
    if (!notification.read) {
      await readNotification(currentUser.token, notification);
    }
  };

  const active = notification.read
    ? ""
    : "bg-bg-color border-left-right-primary-custom";
  const { post, user } = notification;
  console.log(user);
  let body;
  let heading;
  let anchor = "/notifications";
  let tag = notification.title;

  switch (notification?.title) {
    case "Mentioned":
      anchor = `/post/${post._id}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{post?.author}</b> mentioned you in post
          </p>
          <blockquote className="bg-light mt-n2 p-2 border-left-right-secondary-custom">
            <PostText post={post} />
          </blockquote>
        </div>
      );
      break;
    case "Replied":
      anchor = `/post/${post?._id}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{post?.author}</b> replied
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    case "Liked":
      anchor = `/post/${post?._id}/likes`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user?.name}</b> liked
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    case "Followed":
      anchor = `/user/${user?._id}/followers`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user?.name}</b> started following you
          </p>
        </div>
      );
      break;
    case "Unfollowed":
      anchor = `/user/${user?._id}`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user?.name}</b> no longer follows you
          </p>
        </div>
      );
      break;
    case "Reposted":
      anchor = `/post/${post?._id}/reposts`;
      body = (
        <div className="d-flex flex-column">
          <p>
            <b>@{user?._id}</b> reposted
          </p>
          <QuotePost post={post} />
        </div>
      );
      break;
    default:
      break;
  }

  if (user) {
    heading = (
      <div className="d-flex">
        <Link to={`/user/${user?._id}`}>
          <Figure
            className="bg-border-color rounded-circle overflow-hidden mr-1 mb-2"
            style={{ height: "45px", width: "45px" }}
          >
            <Figure.Image src={user?.avatar} className="w-100 h-100" />
          </Figure>
        </Link>
      </div>
    );
  }
  return (
    <ListGroup.Item
      onClick={handleReadNotification}
      className={`${active} px-lg-5 px-xs-2 px-sm-4`}
      action
      as="div"
    >
      <Link className="stretched-link" to={anchor} />
      <div className="mt-n2 mb-2">
        <small>{tag}</small>
      </div>
      {heading}
      {body}
    </ListGroup.Item>
  );
}
