import UsersList from "./UsersList";
import React from "react";
import { useQuery } from "react-query";
import { getUserSuggestions } from "../utils/apiClient";

const UserSuggestions = (props) => {
  const { authUser, ...rest } = props;
  const { data, isLoading, isSuccess } = useQuery(
    "UserSuggestions",
    getUserSuggestions
  );

  const users = data?.filter(
    (user) => user.name !== authUser?.name && !user.following
  );

  if (!users?.length) {
    return (
      <div className="text-primary message">No user suggestions for you</div>
    );
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
