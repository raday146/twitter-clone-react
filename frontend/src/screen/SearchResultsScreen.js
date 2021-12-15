import React from "react";
import Heading from "../components/Heading";
import PostsList from "../components/PostsList";
import UsersList from "../components/UsersList";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getSearchResults } from "../utils/apiClient";

const SearchResultsScreen = () => {
  const locationParam = useLocation();
  const query = new URLSearchParams(locationParam.search).get("q");
  const { data, isLoading, isSuccess } = useQuery(["Search", query], () =>
    getSearchResults(query)
  );

  if (!query) return <Navigate to="/explore" />;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading title="Search" backButton btnProfile />
      {data.users?.length && (
        <UsersList users={data.users} isSuccess={isSuccess} />
      )}
      {data.posts?.length ? (
        <PostsList posts={data.posts} isSuccess={isSuccess} />
      ) : (
        <div className="message">No posts found</div>
      )}
    </>
  );
};
export default SearchResultsScreen;
