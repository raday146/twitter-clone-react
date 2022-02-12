import React from "react";
import { ListGroup } from "react-bootstrap";
import PostItem from "./PostItem";
import Spinner from "./Spinner";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/PostsListStyle";
import { useQueryClient } from "react-query";
import { useAuthUser } from "../context/authContext";

const PostsList = (props) => {
  const { classes, posts, isLoading, isSuccess, no_reply_tag } = props;
  const queryClient = useQueryClient();
  const { currentUser } = useAuthUser();
  const data = posts?.filter((post) => post?.user === currentUser?.user?._id);
  queryClient.setQueryData("User-posts", data, {
    enabled: Boolean(posts),
  });

  if (isLoading) {
    return <Spinner />;
  }
  console.log(posts);
  return (
    <ListGroup variant="flush" className="border-bottom">
      {(isSuccess &&
        posts &&
        posts.map(
          (post, index) =>
            post &&
            post?.author && (
              <PostItem
                key={post._id}
                ind={index}
                post={post}
                no_reply_tag={no_reply_tag}
              />
            )
        )) || (
        <div className=" text-primary message ">No posts for you right now</div>
      )}
    </ListGroup>
  );
};
export default withStyles(styles)(PostsList);
/** */
