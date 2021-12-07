import React from "react";
import Heading from "../components/Heading";
import UsersList from "../components/UsersList";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostLikes } from "../utils/apiClient";

const PostLikesScreen = () => {
  const { postId } = useParams();
  console.log(postId);
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery(["PostLikes", postId], getPostLikes);
  return (
    <>
      <Heading title="Liked by" backButton btnProfile />
      <UsersList
        users={users !== "The list is empty!" ? users : undefined}
        isLoading={isLoading}
        isSuccess={isSuccess}
        noPop
      />
    </>
  );
};
export default PostLikesScreen;
