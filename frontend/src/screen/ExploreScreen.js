import React from "react";
import { Figure, Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { NavLink } from "react-router-dom";
import FollowCard from "../components/FollowCard";
import Heading from "../components/Heading";
import SearchBar from "../components/SearchBar";
import Trends from "../components/Trends";
import UserSuggestions from "../components/UserSuggestions";

const ExploreScreen = ({ noSearchBar }) => {
  return (
    <Row>
      <Col>
        <div className="header">
          {!noSearchBar && (
            <MediaQuery maxWidth={1020}>
              <SearchBar className="w-100 p-2" />
            </MediaQuery>
          )}
        </div>
        <NavLink to="/explore/users">
          <Heading title="Users" />
          <UserSuggestions length={3} noPop />
        </NavLink>

        <MediaQuery maxWidth={992}>
          <FollowCard
            noPop
            title="Follow more users to see their posts"
            length={4}
          />
        </MediaQuery>
        <Heading title="Trends near you" />
        <Figure className="d-flex flex-column">
          <Figure.Image src="/img/twitter-home.png" alt="trends" />
        </Figure>
        <Trends length={6} />
      </Col>
    </Row>
  );
};
export default ExploreScreen;
/**
 * 
 * first routes
 *  <Route path="/explore/users">
          <Heading title="Users" />
          <UserSuggestions length={10} noPop />
        </Route>

   <Routes>
        <NavLink path="/explore/users">
          <Heading title="Users" />
          <UserSuggestions length={10} noPop />
        </NavLink>
        <Route path="/">
          <MediaQuery maxWidth={992}>
            <FollowCard
              noPop
              title="Follow more users to see their posts"
              length={4}
            />
          </MediaQuery>
          <Heading title="Trends near you" />
          <Figure className="d-flex flex-column">
            <Figure.Image src="/img/twitter-home.png" alt="trends" />
          </Figure>
          <Trends length={6} />
        </Route>
      </Routes>
        
 */
