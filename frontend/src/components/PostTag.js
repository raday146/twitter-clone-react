import React from "react";
import { Link } from "react-router-dom";
import UserLink from "./UserLink";
import { useAuthUser } from "../context/authContext";
import { getUserById } from "../utils/apiClient";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "./Spinner";

const PostTag = ({ post, no_reply_tag }) => {
  const { currentUser } = useAuthUser();
  const queryClient = useQueryClient();
  const { data: user, loading } = useQuery(
    ["Comment-user", post?.comments[0]?.user?._id],
    getUserById
  );

  const data = queryClient.getQueriesData("Post-user");
  const postUser = data[0][1];
  const { rTweeted } = post && !post.privateTweet ? post : {};

  const user1 =
    currentUser?.user?._id === postUser?._id ? "You" : `@${postUser?.name}`;

  const user2 =
    currentUser?.user?._id === post?.comments[0]?.user._id
      ? "you"
      : `@${post?.comments[0]?.author}`;

  const replyTagText = `${user1} replied to ${user2}`;

  const isRetweet = rTweeted;
  const isReply = !no_reply_tag && post?.comments[0]?.user._id;

  return loading ? (
    <Spinner />
  ) : (
    <>
      {isRetweet && (
        <UserLink
          user={postUser}
          className="text-muted"
          to={`/user/${postUser?._id}`}
        >
          <small className="text-primary my-5">{`RT: @${postUser?.name}`}</small>
        </UserLink>
      )}
      {isReply && (
        <Link className="text-muted" to={`/post/${user?._id}`}>
          <small>{replyTagText}</small>
        </Link>
      )}
    </>
  );
};
export default PostTag;
