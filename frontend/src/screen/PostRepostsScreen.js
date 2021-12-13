import Heading from "../components/Heading";
import UsersList from "../components/UsersList";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPostReposts } from "../utils/apiClient";

export default function PostRepostsScreen() {
  const { postId } = useParams();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery(["PostReTweets", postId], getPostReposts);

  return (
    <>
      <Heading title="Reposted by" backButton btnProfile />
      <UsersList
        users={users}
        isLoading={isLoading}
        isSuccess={isSuccess}
        noPop
      />
    </>
  );
}
