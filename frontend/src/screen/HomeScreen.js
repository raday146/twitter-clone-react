import React, { useEffect } from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Heading from "../components/Heading";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
export default function HomeScreen({ location }) {
  const auth = useAuthUser();
  const redirect = location?.search ? location.search.split("=")[1] : "/login";
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!auth) {
      navigate(redirect);
    }
  }, [auth, navigate, redirect]);
  return (
    <>
      <Heading title="Home" btnLogout btnProfile />
      <MediaQuery minWidth={576}>
        <CreatePost />
        <div
          style={{ height: "10px" }}
          className="w-100 bg-border-color border"
        />
      </MediaQuery>
      <Feed />
    </>
  );
}
