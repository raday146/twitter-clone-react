import React from "react";
import MultiMedia from "./MultiMedia";
import PostTag from "./PostTag";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";
import ReactionsBar from "./ReactionsBar";
import UserLink from "./UserLink";
import { Figure, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "../utils/date";
import Spinner from "./Spinner";
import Divider from "@mui/material/Divider";
import { useQuery } from "react-query";
import { getUserById } from "../utils/apiClient";

const PostItem = ({ post, repost, ind, no_reply_tag }) => {
  const { data: user, loading } = useQuery(
    ["Post-user", post?.user],
    getUserById
  );

  return loading && !user ? (
    <Spinner />
  ) : (
    <ListGroup.Item className="px-3" action as="div">
      <Link className="stretched-link" to={`/post/${post._id}`} />
      <div className="media mb-n2 w-100 my-3">
        <UserLink
          user={user}
          className="rounded-circle"
          to={`/user/${post?.user}`}
        >
          <Figure
            className="bg-border-color rounded-circle mr-2 overflow-hidden"
            style={{ height: "50px", width: "50px" }}
          >
            <Figure.Image src={user?.avatar} className="w-100 h-100" />
          </Figure>
        </UserLink>
        <div className="media-body w-50">
          <Row className="d-flex align-items-center">
            <UserLink
              user={user}
              to={`/user/${post?.user}`}
              className="text-dark font-weight-bold mr-1"
            >
              {user?.name}
            </UserLink>
            <span className="text-muted mr-1">@{user?.name}</span>
            <span className="text-muted my-2">
              {post && formatCreatedAt(post.createdAt)}
            </span>
            <PostTag post={post} no_reply_tag={no_reply_tag} />
          </Row>
          <Row className=" my-2 mb-n1 mt-1">
            <blockquote className="mb-1 mw-100">
              <PostText text={post.text} to={`/post/${post._id}`} />
            </blockquote>
          </Row>
          <Row className="my-3">
            {(!!!post?.media && (
              <MultiMedia
                text={post.text}
                media={post?.media}
                className="mt-2"
              />
            )) || <Divider />}
            <QuotedPost
              post={!no_reply_tag && post.isQouted}
              className="mt-2"
            />
          </Row>
          <Row className="d-flex justify-content-end align-items-center position-static my-2">
            <ReactionsBar post={post} />
          </Row>
        </div>
      </div>
    </ListGroup.Item>
  );
};
export default PostItem;
