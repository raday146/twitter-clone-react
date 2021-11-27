import axios from "axios";
const clientApi = axios.create({
  baseURL: "http://localhost:3000/",
});
export const authenticate = () => async () => {
  const { data } = await axios.get("/api/users/login");
  return data;
};

export const login = async (payload) => {
  console.log("befor");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { email, password } = payload;
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    window.localStorage.setItem("AuthProvider", JSON.stringify(data));
    window.location.pathname = "/home";
  } catch (error) {
    return error.message;
  }
};

export const signUp = async (name, email, password) => {
  try {
    console.log("start");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await clientApi.post(
      "/api/users/signup",
      { name, email, password },
      config
    );
    window.location.pathname = "/login";
    //    window.location.assign("/settings/profile?redirected=true");

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
