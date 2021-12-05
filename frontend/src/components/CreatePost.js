import React, { useState, useRef } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import { faSmile } from "@fortawesome/free-regular-svg-icons/faSmile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../context/authContext";
import { isTextValid, validate } from "../utils/validate";
import { createPost } from "../utils/apiClient";

const CreatePost = () => {
  const { currentUser } = useAuthUser();
  const textRef = useRef();
  const [disabled, setDisabled] = useState(true);

  function handleChange(e) {
    setDisabled(!!!isTextValid(textRef.current.value));
  }

  async function handleSubmit() {
    try {
      if (disabled) {
        return;
      }
      const validText = validate(textRef.current.value.trim(), "html", {
        max_length: 280,
        identifier: "Post",
      });
      setDisabled(true);
      await createPost(currentUser.token, { text: validText });
      setDisabled(false);
      console.log("done good!");
      textRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="p-2 mt-2 m-3">
      <div className="media">
        <Link
          className="rounded-circle"
          to={`/user/${currentUser?.user?.name}`}
        >
          <img
            className="rounded-circle"
            src={currentUser?.user?.avatar}
            alt={currentUser?.user?.name}
            width={50}
            height={50}
          />
        </Link>
        <div className="media-body">
          <textarea
            className="w-100 p-2"
            style={{ maxHeight: "80vh", height: "auto" }}
            name="text"
            onChange={handleChange}
            ref={textRef}
            placeholder="What's happening?"
          />
          <div className="border-top d-flex justify-content-between align-items-center pt-2">
            <div style={{ fontSize: "1.5em" }}>
              <Link
                className="text-primary btn btn-lg rounded-circle btn-naked-primary p-2 m-2"
                to="/compose/post"
              >
                <FontAwesomeIcon size="lg" icon={faSmile} />
              </Link>
              <button className="disabled text-primary btn btn-lg rounded-circle btn-naked-primary p-2 ">
                <FontAwesomeIcon size="lg" icon={faImage} />
              </button>
            </div>
            <div className="right">
              <Button
                onClick={handleSubmit}
                disabled={disabled}
                className="btn btn-primary  rounded-pill px-3 py-2 font-weight-bold"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
