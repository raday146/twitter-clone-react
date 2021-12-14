import UsersList from "./UsersList";
import React from "react";
import { useQuery } from "react-query";
import { suggestionsToUser } from "../utils/apiClient";

const UserSuggestions = (props) => {
  const { userId, following, ...rest } = props;
  const { data, isLoading, isSuccess } = useQuery(
    "suggestions",
    suggestionsToUser
  );

  const users = data?.filter(
    (user) => user._id !== userId && !following?.includes(user._id)
  );

  if (!users?.length) {
    return <div className="text-primary message">No suggestions for you</div>;
  }

  return (
    <UsersList
      {...rest}
      isSuccess={isSuccess}
      isLoading={isLoading}
      users={users}
    />
  );
};
export default UserSuggestions;
