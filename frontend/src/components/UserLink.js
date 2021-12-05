import FollowButton from "./FollowButton";
import React, { forwardRef, useState } from "react";
import { Card, Figure, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import { truncateText } from "../utils/truncate";

const UserLink = ({ user, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <OverlayTrigger
      show={show}
      placement="auto"
      delay="300"
      overlay={<UserPopover setShow={setShow} user={user} />}
    >
      <Link {...props} />
    </OverlayTrigger>
  );
};

const UserPopover = forwardRef(({ user, setShow, ...props }, ref) => {
  return (
    <Popover className="border-0" ref={ref} id="user-popover" {...props}>
      <Card
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(undefined)}
        className="border p-3 bg-transparent m-0"
      >
        <Row className="d-flex justify-content-between align-items-center">
          <Figure
            style={{ height: "65px", width: "65px" }}
            className="rounded-circle overflow-hidden bg-primary mr-3"
          >
            <Figure.Image className="w-100 h-100" src={user?.avatar} />
          </Figure>
          <FollowButton user={user} />
        </Row>
        <div className="flex flex-column">
          <b>{user?.name}</b>
          <div className="text-muted mb-2 mt-0">{user?.name}</div>
        </div>
        <blockquote>{truncateText(user?.bio, 10)}</blockquote>
        <Row className="d-flex flex-column">
          <span className="text-muted">{user?.location}</span>
          <span className="text-muted">
            Joined {formatDate(user?.createdAt)}
          </span>
        </Row>
        <Row className="d-flex mt-1 mb-2">
          <em className="mr-2">
            {user.followers_count} <span className="text-muted">Followers</span>
          </em>
          <div className="mr-2">
            {user.friends_count} <span className="text-muted">Following</span>
          </div>
        </Row>
      </Card>
    </Popover>
  );
});
export default UserLink;
