import MultiMedia from "./MultiMedia";
import PostTag from "./PostTag";
import PostText from "./PostText";
import QuotedPost from "./QuotedPost";
import ReactionsBar from "./ReactionsBar";
import UserLink from "./UserLink";
import React from "react";
import { Figure, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "../utils/date";

export default function PostItem({ post, no_reply_tag }) {
  return (
    <ListGroup.Item className="px-3" action as="div">
      <Row className="d-flex px-3 pb-1 mt-n2 text-muted">
        <PostTag post={post} no_reply_tag={no_reply_tag} />
      </Row>
      <Link className="stretched-link" to={`/post/${post.id_str}`} />
      <div className="media mb-n2 w-100">
        <UserLink
          user={post.user}
          className="rounded-circle"
          to={`/user/${post.user.screen_name}`}
        >
          <Figure
            className="bg-border-color rounded-circle mr-2 overflow-hidden"
            style={{ height: "50px", width: "50px" }}
          >
            <Figure.Image
              src={post.user.profile_image_url_https}
              className="w-100 h-100"
            />
          </Figure>
        </UserLink>
        <div className="media-body w-50">
          <Row className="d-flex align-items-center">
            <UserLink
              user={post.user}
              to={`/user/${post.user.screen_name}`}
              className="text-dark font-weight-bold mr-1"
            >
              {post.user.name}
            </UserLink>
            <span className="text-muted mr-1">@{post.user.screen_name}</span>
            <pre className="m-0 text-muted">{" - "}</pre>
            <span className="text-muted">
              {formatCreatedAt(post.created_at)}
            </span>
          </Row>
          <Row className="mb-n1 mt-1">
            <blockquote className="mb-1 mw-100">
              <PostText post={post} to={`/post/${post.id_str}`} />
            </blockquote>
          </Row>
          <Row>
            <MultiMedia post={post} className="mt-2" />
            <QuotedPost
              post={!no_reply_tag && post.quoted_status}
              className="mt-2"
            />
          </Row>
          <Row className="d-flex justify-content-end align-items-center position-static">
            <ReactionsBar post={post} />
          </Row>
        </div>
      </div>
    </ListGroup.Item>
  );
}
