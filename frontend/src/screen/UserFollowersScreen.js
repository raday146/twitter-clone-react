import Heading from "../components/Heading";
import UserList from "../components/UsersList";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getUserFollowers } from "../utils/apiClient";

export default function UserFollowers() {
  const { userId } = useParams();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery(["UserFollowers", userId], getUserFollowers);
  console.log(users && users.length > 0);
  return (
    <>
      <Heading title="Followers" backButton btnProfile />
      {isSuccess && users && users.length > 0 ? (
        <UserList
          users={users}
          isLoading={isLoading}
          isSuccess={isSuccess}
          noPop
        />
      ) : (
        <div className="message">No Followers</div>
      )}
    </>
  );
}
