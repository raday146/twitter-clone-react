import React, { useState, useEffect } from "react";
import PostsList from "./PostsList";
import { useInfiniteQuery } from "react-query";
import { getPosts } from "../utils/apiClient";
import FollowCard from "./FollowCard";
import Spinner from "./Spinner";
import { Row, Col } from "react-bootstrap";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const Feed = () => {
  const [page, setPage] = useState(2);
  const [hasFinished, setHasFinished] = useState(false);

  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery("Posts", getPosts);

  useEffect(() => {
    if (!posts && posts?.pages) {
      const hasFinished = posts?.pages.some((p) => p.length < 20);
      setHasFinished(hasFinished);
    }
  }, [posts]);

  useBottomScrollListener(() => {
    if (hasFinished) return;
    fetchNextPage({ pageParam: page });
    setPage((page) => page + 1);
  }, 200);

  return (
    <Row>
      <Col m-3>
        {(hasFinished && (
          <PostsList
            posts={posts?.pages.flatMap((page) => page)}
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
