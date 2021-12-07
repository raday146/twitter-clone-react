import React, { useState, useEffect, useCallback } from "react";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faComment as commentSolid } from "@fortawesome/free-solid-svg-icons/faComment";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import {
  likePost,
  repostPost,
  unlikePost,
  unrepostPost,
} from "../utils/apiClient";

const ReactionsBar = ({ post }) => {
  const { currentUser } = useAuthUser();
  const [signHaert, setSignHaert] = useState(false);

  const handleToggleLike = async () => {
    await likePost(currentUser.token, post._id);
  };

  const checkLike = useCallback(() => {
    return post?.likes.filter((l) => l.user === currentUser.user._id).length;
  }, [currentUser.user._id, post?.likes]);

  useEffect(() => {
    if (post && !post?.likes) {
      setSignHaert(false);
    } else {
      setSignHaert(checkLike());
    }
  }, [checkLike, post]);

  function handleToggleRepost() {
    post?.tweeted ? unrepostPost(post) : repostPost(post);
  }

  return (
    <div className="d-flex align-items-center">
      <Dropdown drop="up" className="bg-clear high-index">
        <Dropdown.Toggle
          className="btn btn-naked-primary rounded-pill"
          id="comment-dropdown"
        >
          {post?.tweeted ? (
            <FontAwesomeIcon icon={commentSolid} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faComment} />
          )}
          <small className="m-1">{post.tweetCount}</small>
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight className="higher-index rounded-0">
          <Dropdown.Item
            onClick={handleToggleRepost}
            className="high-index"
            as="button"
          >
            {post.tweeted ? "Undo Repost" : "Repost"}
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            className="high-index"
            to={`/compose/post?quote=${post._id}`}
          >
            Quote this post
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link
        to={`/compose/post?reply_to=${post._id}`}
        className="btn btn-naked-secondary rounded-pill high-index m-2"
      >
        <FontAwesomeIcon
          style={{ fontSize: "1.2em" }}
          className="mb-1 text-muted"
          icon={faReply}
        />
      </Link>
      <button
        onClick={handleToggleLike}
        className="btn btn-naked-danger rounded-pill high-index m-2"
      >
        {signHaert ? (
          <FontAwesomeIcon icon={heartSolid} className="text-danger" />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
        <small className="m-1">{post.numLikes}</small>
      </button>
    </div>
  );
};
export default ReactionsBar;
