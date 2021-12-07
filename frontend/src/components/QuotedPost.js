import MultiMedia from "./MultiMedia";
import PostText from "./PostText";
import UserLink from "./UserLink";
import React from "react";
import { Card, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "../utils/date";

const QuotedPost = ({ post, className, expanded = false }) => {
  if (!post) {
    return null;
  }

  return (
    <Card className={`${className} w-100 border bg-light overflow-hidden`}>
      <Link className="stretched-link" to={`/post/${post._id}`} />
      <div className="p-2">
        <Row className="d-flex align-items-center">
          <UserLink
            className="rounded-circle d-block"
            to={`/user/${post?.user?._id}`}
          >
            <Figure
              className="bg-border-color rounded-circle overflow-hidden mr-1 mb-0"
              style={{ height: "25px", width: "25px" }}
            >
              <Figure.Image src={post?.user?.avatar} className="w-100 h-100" />
            </Figure>
          </UserLink>
          <UserLink
            to={`/user/${post?.user?.name}`}
            className="text-dark font-weight-bold mr-1"
          >
            {post?.user?.name}
          </UserLink>
          <span className="text-muted">@{post?.user?.name}</span>
          <pre className="m-0 text-muted">{" - "}</pre>
          <span className="text-muted">{formatCreatedAt(post.createdAt)}</span>
        </Row>
        <Row>
          <blockquote className="mb-1">
            <PostText
              text={post.text}
              to={`/post/${post._id}`}
              expanded={expanded}
            />
          </blockquote>
        </Row>
      </div>
      {!!post?.media && (
        <Row>
          <MultiMedia text={post?.text} className="rounded-0" />
        </Row>
      )}
    </Card>
  );
};
export default QuotedPost;
