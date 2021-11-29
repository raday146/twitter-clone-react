import React from "react";
import Heading from "../components/Heading";
import UsersList from "../components/UsersList";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostLikes } from "../utils/apiClient";

const PostLikesScreen = () => {
  const { postId } = useParams();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery("PostLikes", () => getPostLikes(postId));

  return (
    <>
      <Heading title="Liked by" backButton btnProfile />
      <UsersList
        users={users}
        isLoading={isLoading}
        isSuccess={isSuccess}
        noPop
      />
    </>
  );
};
export default PostLikesScreen;
