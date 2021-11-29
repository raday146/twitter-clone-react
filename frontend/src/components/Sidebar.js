import SearchBar from "./SearchBar";
import React from "react";
import { Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FollowCard from "./FollowCard";
import TrendingCard from "./TrendingCard";

const Sidebar = () => {
  const location = useLocation();

  return (
    <Col className="m-3">
      <SearchBar className="sticky-top my-2" />
      {location.pathname !== "/explore/users" && (
        <FollowCard compact className="my-3" length={5} title="Who to follow" />
      )}
      {location.pathname !== "/explore" && (
        <TrendingCard className="my-3" title="Trends for you" />
      )}
    </Col>
  );
};
export default Sidebar;
