import React from "react";
import { ListGroup } from "react-bootstrap";
import Spinner from "./Spinner";
import UserItem from "./UserItem";

const UsersList = (props) => {
  const { users, isSuccess, isLoading, length, className, ...rest } = props;

  return isLoading ? (
    <Spinner />
  ) : (
    <ListGroup className={`border-bottom ${className}`} variant="flush">
      {isSuccess && users ? (
        users
          ?.slice(0, length)
          .map((user) => <UserItem key={user._id} user={user} {...rest} />)
      ) : (
        <div className="message font-weight-bold">No users to show</div>
      )}
    </ListGroup>
  );
};
export default UsersList;
