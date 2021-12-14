import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import UserSuggestions from "./UserSuggestions";

const FollowCard = (props) => {
  const { currentUser } = useAuthUser();
  const { className, title, length, ...rest } = props;
  return (
    <Card className={className}>
      <Card.Header>{title}</Card.Header>
      {currentUser?.user ? (
        <UserSuggestions
          userId={currentUser?.user._id}
          following={currentUser?.user?.following}
          length={length}
          {...rest}
        />
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
};

export default FollowCard;
