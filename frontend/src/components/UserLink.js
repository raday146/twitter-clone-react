import React, { forwardRef, useState } from "react";
import FollowButton from "./FollowButton";
import { Card, Figure, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import { truncateText } from "../utils/truncate";

const UserLink = ({ user, on, ...props }) => {
  const [show, setShow] = useState(on);

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
  const handleMouseLeave = () => {
    setShow(false);
  };
  const handleMouseEnter = () => {
    setShow(true);
  };
  return (
    <Popover className="border-0" ref={ref} id="user-popover" {...props}>
      <Card
        on
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border p-3 bg-transparent m-0"
      >
        <Row className="">
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
            {user?.numFollowers} <span className="text-muted">Followers</span>
          </em>
          <div className="mr-2">
            {user?.numFollowing} <span className="text-muted">Following</span>
          </div>
        </Row>
      </Card>
    </Popover>
  );
});
export default UserLink;
