import React, { useEffect, useState, useRef } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import { faSmile } from "@fortawesome/free-regular-svg-icons/faSmile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuotedPost from "../components/QuotedPost";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Alert, Modal, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import { createPost, getPostById } from "../utils/apiClient";
import { isTextValid, validate } from "../utils/validate";

const CreatePostModalScreen = ({ location }) => {
  const history = useNavigate();
  const quoteId = new URLSearchParams(history.location.search).get("quote");
  const replyId = new URLSearchParams(history.location.search).get("reply_to");
  const { currentUser } = useAuthUser();
  const redirect = location?.search ? location.search.split("=")[1] : "/login";
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!currentUser) {
      navigate(redirect);
    }
  }, [currentUser, navigate, redirect]);
  const { data: quotePost } = useQuery(
    "QuotePost",
    () => getPostById(quoteId),
    {
      enabled: Boolean(quoteId),
    }
  );
  const { data: replyPost } = useQuery(
    "ReplyPost",
    () => getPostById(replyId),
    {
      enabled: Boolean(replyId),
    }
  );
  const textRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setDisabled(!isTextValid(textRef.current.value));
  }

  async function handleSubmit() {
    try {
      if (disabled) return;
      const content = validate(textRef.current.value.trim(), "html", {
        max_length: 280,
        identifier: "Post",
      });
      setDisabled(true);
      let post = { text: content };
      let url;
      if (replyId) {
        url = `/api/post/${replyId}/reply`;
      } else if (quotePost) {
        post = {
          ...post,
          is_quote_status: true,
          quoted_status_id: quotePost.id,
          quoted_status_id_str: quotePost.id_str,
          quoted_status: quotePost._id,
        };
      }
      await createPost(post, url);
      setDisabled(false);
      textRef.current.value = "";
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCloseModal() {
    history.goBack();
  }

  function addEmoji(emoji) {
    textRef.current.value = textRef.current.value + emoji.native;
  }

  const picker = (
    <Popover id="popover-basic">
      <Picker
        onSelect={addEmoji}
        color="#3eaaee"
        sheetSize={32}
        emoji="point_up"
        title="Pick your emoji"
        set="twitter"
      />
    </Popover>
  );

  return (
    <Modal
      className="p-0"
      size="lg"
      scrollable
      show
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title>
          <small className="font-weight-bold">
            {replyId ? "Post your reply" : "Compose post"}
          </small>
        </Modal.Title>
      </Modal.Header>
      {error && (
        <Alert variant="danger" className="font-weight-bold text-white">
          {error}
        </Alert>
      )}
      <Modal.Body className="pt-1 pb-0">
        <div className="media h-100 w-100">
          <img
            className="rounded-circle"
            src={currentUser?.image}
            alt={currentUser?.name}
            width={50}
            height={50}
          />
          <div className="media-body h-100 w-50" style={{ minHeight: "175px" }}>
            <textarea
              className="w-100 p-2 pb-5"
              style={{ height: "auto" }}
              name="text"
              onChange={handleChange}
              ref={textRef}
              placeholder="What's happening?"
            ></textarea>
            <QuotedPost post={replyPost || quotePost} className="mb-2 mt-n5" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="py-1">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div style={{ fontSize: "1.5em" }}>
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="auto-start"
              overlay={picker}
            >
              <button className="text-primary btn btn-lg rounded-circle btn-naked-primary p-2">
                <FontAwesomeIcon size="lg" icon={faSmile} />
              </button>
            </OverlayTrigger>
            <button className="disabled text-primary btn btn-lg rounded-circle btn-naked-primary ">
              <FontAwesomeIcon size="lg" icon={faImage} />
            </button>
          </div>
          <div className="right">
            <Button
              onClick={handleSubmit}
              disabled={disabled}
              className="btn btn-primary disabled rounded-pill px-3 py-2 font-weight-bold "
            >
              Post
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default CreatePostModalScreen;
