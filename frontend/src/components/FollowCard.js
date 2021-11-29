import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import UserSuggestions from "./UserSuggestions";

export default function FollowCard(props) {
  const { currentUser } = useAuthUser();
  const { className, title, length, ...rest } = props;

  return (
    <Card className={className}>
      <Card.Header>{title}</Card.Header>
      {currentUser ? (
        <UserSuggestions authUser={currentUser} length={length} {...rest} />
      ) : (
        <div className="text-primary message">
          Login to see users and their posts
        </div>
      )}
      <Card.Footer>
        <Card.Link as={Link} to="/explore/users">
          Show more
        </Card.Link>
      </Card.Footer>
    </Card>
  );
}
