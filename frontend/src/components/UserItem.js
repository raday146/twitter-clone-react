import FollowButton from "./FollowButton";
import UserLink from "./UserLink";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { truncateText } from "../utils/truncate";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/userItemStyle";
const UserItem = ({ user, noPop, compact, classes }) => {
  //pr-5 pr-lg-4 pr-xl-2 mx-3 py-2" xs="8"
  return (
    <ListGroup.Item
      className={` ${classes.btn} px-1 text-truncate `}
      user={user}
      as={noPop ? Link : UserLink}
      to={`/user/${user?._id}`}
    >
      <div className={` ${classes.userCard} Media`}>
        <img
          width={50}
          height={50}
          className="rounded-circle mx-3"
          src={user?.avatar}
          alt={user?.name}
        />
        <div className="Media-Body ">
          <Row>
            <Col className="py-3" xs="12">
              <p
                className={`${classes.linkName} text-dark mb-0 text-truncate text-capitalize`}
              >
                {user?.name}
              </p>
              <p
                className={`${classes.linkName} text-muted text-truncate mt-n1 py-1`}
              >
                {" "}
                @{user?.name}
              </p>
            </Col>

            <Col>
              <FollowButton user={user} />
            </Col>
          </Row>
          <Row>
            {!compact && (
              <blockquote className="mb-0 mt-n2">
                {truncateText(user.bio, 7)}
              </blockquote>
            )}
          </Row>
        </div>
      </div>
    </ListGroup.Item>
  );
};
export default withStyles(styles)(UserItem);
