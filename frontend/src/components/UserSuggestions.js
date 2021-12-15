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
  const arr = ["israel", "shlomo", "yakov", "nati"];
  const users = data?.filter(
    (user) => !following?.includes(user._id) && !String(user._id).match(userId)
  );
  const names = arr.filter((name) => name !== "shlomo" && !name.includes("i"));
  console.log(users);

  console.log(names, !following?.includes("619bf37f0d7bb747ec210ef5"));
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
