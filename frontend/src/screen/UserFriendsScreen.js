import Heading from "../components/Heading";
import UserList from "../components/UsersList";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getFriends } from "../utils/apiClient";

export default function UserFriendsScreen() {
  const { userId } = useParams();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery(["UserFriends", userId], getFriends);

  return (
    <>
      <Heading title="Following" backButton btnProfile />
      <UserList
        users={users}
        isLoading={isLoading}
        isSuccess={isSuccess}
        noPop
      />
    </>
  );
}
