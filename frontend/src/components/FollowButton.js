import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../context/authContext";
import { setHandlerFollow } from "../utils/apiClient";

const FollowButton = ({ user }) => {
  const { currentUser } = useAuthUser();
  const [hoverText, setHoverText] = useState("");
  const [hoverVariant, setHoverVariant] = useState("");
  const [follow, setFollow] = useState(false);
  const textRef = useRef("");
  //console.log(!currentUser.user?.following.includes(user._id));

  useEffect(() => {
    if (!currentUser?.user?.following.includes(user._id)) {
      setFollow(false);
      textRef.current = "Follow";
    } else {
      setFollow(true);
      textRef.current = "Following";
    }
  }, [currentUser.user, user]);

  function handleMouseEnter() {
    follow && setHoverText("Unfollow");
    follow && setHoverVariant("danger");
  }

  function handleMouseLeave() {
    setHoverText("");
    setHoverVariant("");
  }

  const followHandler = async (e) => {
    e.preventDefault();
    await setHandlerFollow(currentUser.token, user?._id);
    setFollow(currentUser?.user?.following.includes(user._id));
    if (follow) {
      setHoverText("Unfollowed");
    }
  };

  const variant = follow ? "primary" : "outline-primary";

  const hideFollowButton = !user || currentUser?._id === user?._id;

  if (hideFollowButton) {
    return null;
  }

  return (
    <Button
      onClick={followHandler}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variant={hoverVariant || variant}
      className={"rounded-pill py-2"}
    >
      <span>{hoverText || textRef.current}</span>
    </Button>
  );
};
export default FollowButton;
