import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Trends from "./Trends";

const TrendingCard = ({ className, title }) => {
  return (
    <Card className={className}>
      <Card.Header>{title}</Card.Header>
      <Trends length={2} />
      <Card.Footer>
        <Card.Link as={Link} to="/explore">
          Show more
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
export default TrendingCard;
