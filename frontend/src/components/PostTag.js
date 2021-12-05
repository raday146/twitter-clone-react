import UserLink from "./UserLink";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import { getUserById } from "../utils/apiClient";
import { useQuery } from "react-query";
import Spinner from "./Spinner";

const PostTag = ({ post, no_reply_tag }) => {
  const { currentUser } = useAuthUser();
  const { data: user, loading } = useQuery(
    ["Comment-user", post?.comments[0]?.user?._id],
    getUserById
  );
  const { tweeted } = post;

  const user1 =
    currentUser?.user?.name === post?.author ? "You" : `@${post?.author}`;

  const user2 =
    currentUser?.user?.name === post?.comments[0]?.author
      ? "you"
      : `@${post?.comments[0]?.author}`;

  const replyTagText = `${user1} replied to ${user2}`;

  const isRetweet = tweeted;
  const isReply = !no_reply_tag && post?.comments[0]?.author;

  return loading ? (
    <Spinner />
  ) : (
    <>
      {isRetweet && (
        <UserLink user={user} className="text-muted" to={`/user/${user?._id}`}>
          <small>@{user?.name} retweeted</small>
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
