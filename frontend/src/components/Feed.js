import React, { useState, useEffect } from "react";
import PostsList from "./PostsList";
import { useInfiniteQuery, useQuery } from "react-query";
import { getPosts } from "../utils/apiClient";
import FollowCard from "./FollowCard";
import Spinner from "./Spinner";
import { Row, Col } from "react-bootstrap";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const Feed = () => {
  //const { data, loading } = useQuery("Posts", getPosts);
  const [page, setPage] = useState(2);
  const [hasFinished, setHasFinished] = useState(false);
  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery("Posts", getPosts);
  //console.log(posts);

  useEffect(() => {
    setHasFinished(!hasNextPage);
  }, [hasNextPage, posts]);

  useBottomScrollListener(() => {
    if (hasFinished) {
      return;
    }
    fetchNextPage({ pageParam: page });
    setPage((page) => page + 1);
  }, 200);

  return (
    <Row>
      <Col m-3>
        {(hasFinished && (
          <PostsList
            posts={posts?.pages.reduce((page) => page)}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        )) || (
          <div className="m-4">
            <PostsList />
          </div>
        )}
        {isFetchingNextPage && <Spinner />}
        {(hasFinished && (
          <>
            <div className="message text-primary">
              You have reached the end!
            </div>
            <FollowCard
              noPop
              length={7}
              title="Follow more users to see their posts"
            />
          </>
        )) || <FollowCard />}
      </Col>
    </Row>
  );
};
export default Feed;
