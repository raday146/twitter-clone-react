import Heading from "../components/Heading";
import MultiMedia from "../components/MultiMedia";
import PostsList from "../components/PostsList";
import PostTag from "../components/PostTag";
import PostText from "../components/PostText";
import QuotedPost from "../components/QuotedPost";
import ReactionsBar from "../components/ReactionsBar";
import UserLink from "../components/UserLink";
import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Divider from "@mui/material/Divider";

import { getPost, getUserById } from "../utils/apiClient";
import { formatDate, formatTime } from "../utils/date";

const PostDetailScreen = () => {
  const { postId } = useParams();

  const { data: post, loading } = useQuery(["PostDetail", postId], getPost);
  const { data: user, isLoading } = useQuery(
    ["Post-user", post?.user],
    getUserById,
    {
      enabled: Boolean(post?.user),
    }
  );

  if (!post) {
    return <div className="message font-weight-bold">Post not found</div>;
  }

  return loading && isLoading ? (
    <Spinner />
  ) : (
    <>
      <Heading backButton title="Post" />
      <Col className="p-3 d-flex flex-column">
        <Row>
          <Row>
            <UserLink
              user={user}
              className="rounded-circle"
              to={`/user/${post?.user?._id}`}
            >
              <Figure
                className="bg-border-color rounded-circle mr-2 overflow-hidden"
                style={{ height: "50px", width: "50px" }}
              >
                <Figure.Image
                  src={post?.user?.avatar}
                  className="w-100 h-100"
                />
              </Figure>
            </UserLink>
            <Col className="d-flex flex-column">
              <UserLink
                user={user}
                to={`/user/${post?.user?._id}`}
                className="text-dark font-weight-bold mr-1"
              >
                {post?.user?.name}
              </UserLink>
              <span className="text-muted mb-2 mr-1">@{post?.user?.name}</span>
              <PostTag post={post} />
            </Col>
          </Row>
        </Row>
        <Row>
          <blockquote style={{ fontSize: "1.5em" }} className="my-2 mw-100">
            <PostText text={post.text} expanded />
          </blockquote>
        </Row>
        <Row className="mb-2">
          {(!!!post?.media && (
            <MultiMedia text={post?.text} className="mt-2" expanded />
          )) || <Divider />}
          <QuotedPost post={post} className="mt-2" />
        </Row>
        <Row>
          <span className="text-muted pb-2">
            {formatTime(post.createdAt)}
            {formatDate(post.createdAt)}
          </span>
        </Row>
        <Row className="border-top border-bottom d-flex p-2">
          <div className="py-1 pr-3">
            <span className="font-weight-bold mr-1"> {post.numLikes}</span>{" "}
            <Link to={`/post/${post._id}/likes`} className="text-muted">
              Likes
            </Link>
          </div>
          <div className="py-1 pr-3 ">
            <span className="font-weight-bold mr-1">{post.tweetCount}</span>{" "}
            <Link to={`/post/${post._id}/reposts`} className="text-muted">
              Reposts
            </Link>
          </div>
        </Row>
        <Row className="d-flex justify-content-end align-items-center mt-2 border-bottom">
          <ReactionsBar post={post} />
        </Row>
        {post && post?.comments && (
          <PostsList
            no_reply_tag
            posts={post.comments}
            isSuccess={!!post?.comments}
          />
        )}
      </Col>
    </>
  );
};
export default PostDetailScreen;
/**
 *         <PostsList no_reply_tag posts={replies} isSuccess={isSuccess} />

 */
