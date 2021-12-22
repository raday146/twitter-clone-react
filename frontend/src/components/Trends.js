import React from "react";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTrends } from "../utils/apiClient";
import Spinner from "./Spinner";

const Trends = ({ length }) => {
  const { data: trends, isLoading, isSuccess } = useQuery("Trends", getTrends);

  if (isLoading) return <Spinner />;
  console.log(trends);
  if (!trends || trends.length === 0) {
    return <div className="text-primary message">No trends right now</div>;
  }

  return (
    <ListGroup variant="flush">
      {isSuccess && !!trends
        ? trends?.slice(0, length).map((trend) => (
            <ListGroup.Item
              key={trend?.name}
              as={Link}
              action
              to={`/search?keyword=${trend?.name}`}
            >
              <small className="text-muted">Trending Worldwide</small>
              <p className="mb-1 text-dark font-weight-bold text-capitalize">
                {trend?.trend}
              </p>
              <em>{trend?.tweetVolume} Tweets</em>
            </ListGroup.Item>
          ))
        : null}
    </ListGroup>
  );
};
export default Trends;
