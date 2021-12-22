import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../context/authContext";
import { setHandlerFollow } from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const FollowButton = ({ user }) => {
  const { currentUser } = useAuthUser();
  const [hoverText, setHoverText] = useState("");
  const [hoverVariant, setHoverVariant] = useState("");
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);
  const [loadingTAG, setLoadingTAG] = useState(true);
  const textRef = useRef("");
  //console.log(!currentUser.user?.following.includes(user._id));

  useEffect(() => {
    if (!!currentUser) {
      if (currentUser.user._id === user._id) {
        setFollow(false);
        textRef.current = "";
        setLoadingTAG(false);
      } else if (!currentUser?.user?.following.includes(user._id)) {
        setFollow(false);
        textRef.current = "Follow";
        setLoadingTAG(false);
      } else {
        setFollow(true);
        textRef.current = "Following";
        setLoadingTAG(false);
      }
    } else {
      setFollow(false);
      textRef.current = "login to follow";
      setLoadingTAG(false);
    }
  }, [currentUser, currentUser?.user, user]);

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
  const goLogin = () => {
    navigate("/");
  };

  const variant = follow ? "primary" : "outline-primary";

  const hideFollowButton = !user || currentUser?._id === user?._id;

  if (hideFollowButton) {
    return null;
  }

  return (
    (loadingTAG && <Spinner />) || (
      <Button
        disabled={currentUser.user._id === user._id}
        onClick={(currentUser && followHandler) || goLogin}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variant={hoverVariant || variant}
        className="rounded-pill py-2"
      >
        <span>{hoverText || textRef.current}</span>
      </Button>
    )
  );
};
export default FollowButton;
