import UserLink from "./UserLink";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";

export default function PostTag({ post, no_reply_tag }) {
  const { currentUser } = useAuthUser();
  const { retweeted_status } = post;

  const user1 =
    currentUser?.name === post.user.name ? "You" : `@${post.user.name}`;

  const user2 =
    currentUser?.name === post.in_reply_to_name
      ? "you"
      : `@${post.in_reply_to_name}`;

  const replyTagText = `${user1} replied to ${user2}`;

  const isRetweet = retweeted_status;
  const isReply = !no_reply_tag && post.in_reply_to_name;

  return (
    <>
      {isRetweet && (
        <UserLink
          user={retweeted_status.user}
          className="text-muted"
          to={`/user/${retweeted_status.user.name}`}
        >
          <small>@{retweeted_status.user.name} retweeted</small>
        </UserLink>
      )}
      {isReply && (
        <Link
          className="text-muted"
          to={`/post/${post.in_reply_to_status_id_str}`}
        >
          <small>{replyTagText}</small>
        </Link>
      )}
    </>
  );
}
