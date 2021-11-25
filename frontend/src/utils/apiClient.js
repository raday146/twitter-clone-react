import axios from "axios";
const client = axios.create();

export const authenticate = async () => {
  const { data } = await client.get("api/users/login");
  return data;
};

export const login = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await client.post(
      "api/users/login",
      { email, password },
      config
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const singup = async (name, email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await client.post("api/users/signup", { name, email, password }, config);
    window.location.pathname = "/";
  } catch (error) {
    return error.message;
  }
};

export const logout = async () => {
  await client.get("api/users/logout");
  window.location.pathname = "/";
};
export const getNotifications = async () => {};
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
