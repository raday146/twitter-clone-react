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
  const query = new URLSearchParams(locationParam.search).get("keyword");
  const { data, isLoading, isSuccess } = useQuery(
    ["Search", query],
    getSearchResults
  );

  if (!query) return <Navigate to="/explore" />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading title="Search" backButton btnProfile />
      {data && data.users?.length && (
        <UsersList users={data.users} isSuccess={isSuccess} />
      )}
      {data && data.posts?.length && (
        <PostsList posts={data.posts} isSuccess={isSuccess} />
      )}
      {data && data.trends?.length ? (
        <PostsList posts={data.trends} isSuccess={isSuccess} />
      ) : (
        <div className="message">No results</div>
      )}
    </>
  );
};
export default SearchResultsScreen;
