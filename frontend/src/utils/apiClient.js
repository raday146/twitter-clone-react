import axios from "axios";
import { queryClient } from "../providers/AppProvider";

const clientApi = axios.create({
  baseURL: "http://localhost:3000/",
});
export const authenticate = () => async () => {
  const { data } = await axios.get("/api/users/login");
  return data;
};

export const loginApi = async (email, password) => {
  console.log("befor");
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
    window.localStorage.setItem("AuthProvider", JSON.stringify(data));
    window.location.pathname = "/";
  } catch (error) {
    return error.message;
  }
};
/*
export const login = async (email, password) => {
  console.log("befor");
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
    window.localStorage.setItem("AuthProvider", JSON.stringify(data));
    window.location.pathname = "/home";
  } catch (error) {
    return error.message;
  }
};*/

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
    window.location.assign("/settings/profile?redirected");

    console.log("dd");
  } catch (error) {
    return error;
  }
};

export const logout = () => async () => {
  await axios.get("api/users/logout");
  window.location.pathname = "/login";
};

export const getProfile = async (token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/users/profile", config);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const updateUserDetails = async (token, user) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put("/api/users/profile", user, config);

    console.log(data);
    return data.user;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const createPost = async (token, post) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post("/api/posts", post, config);
    await queryClient.invalidateQueries("Posts");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getPosts = async () => {
  try {
    const { data } = await clientApi.get("/api/posts");
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getUserById = async ({ queryKey }) => {
  try {
    const id = queryKey[1];

    if (!id) {
      return "No users";
    }
    console.log(id);
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getPost = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    if (!id) {
      return "No Post";
    }
    const { data } = await axios.get(`/api/posts/${id}`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getPostLikes = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    if (!id) {
      return "No Post";
    }
    const { data } = await axios.get(`/api/posts/${id}/like`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const likePost = async (token, id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(`/api/posts/${id}/like`, config);
    await queryClient.invalidateQueries("Posts");
    console.log("like action end!");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getPostReposts = async () => {};
export const repostPost = async () => {};

export const unrepostPost = async () => {};

export const getNotifications = () => async () => {};
export const readNotifactions = async () => {};
export const getReplies = async () => {};
export const getUserSuggestions = async () => {};
export const unfollowUser = async () => {};
export const followUser = async () => {};
export const getTrends = async () => {};
export const getFriends = async () => {};
export const getPostById = async () => {};
export const getSearchResults = async () => {};
export const getUserFollowers = async () => {};
export const getUserTimeline = async () => {};
export const readNotification = async () => {};
