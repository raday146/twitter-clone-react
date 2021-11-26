import axios from "axios";

export const authenticate = () => async () => {
  const { data } = await axios.get("/api/users/login");
  return data;
};

export const login = (name, email, password) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const signup = (name, email, password) => async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("here", name, email, password);
    const { data } = await axios.post(
      "/api/users/signup",
      { name, email, password },
      config
    );
    console.log(data);
    window.location.pathname = "/";
    console.log("dd");
  } catch (error) {
    return error;
  }
};

export const logout = () => async () => {
  await axios.get("api/users/logout");
  window.location.pathname = "/";
};
export const getNotifications = () => async () => {};
export const readNotifactions = async () => {};
export const getPosts = async () => {};
export const getReplies = async () => {};
export const getUserSuggestions = async () => {};
export const unfollowUser = async () => {};
export const followUser = async () => {};
export const getTrends = async () => {};
export const createPost = async () => {};
export const getFriends = async () => {};
export const getPostById = async () => {};
export const getPostLikes = async () => {};
export const getPostReposts = async () => {};
export const getSearchResults = async () => {};
export const getUserFollowers = async () => {};
export const getUserTimeline = async () => {};
export const readNotification = async () => {};
export const updateUserDetails = async () => {};
export const likePost = async () => {};
export const repostPost = async () => {};
export const unlikePost = async () => {};
export const unrepostPost = async () => {};
