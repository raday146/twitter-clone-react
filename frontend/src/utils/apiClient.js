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
    const avatar =
      "https://res.cloudinary.com/dapifwhwo/image/upload/v1639183794/default-avatar_lossy8.jpg";
    console.log("start");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await clientApi.post(
      "/api/users/signup",
      { name, email, password, avatar },
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

export const getPosts = async ({ queryKey }) => {
  try {
    const userId = queryKey[1];
    if (userId) {
      const { data } = await clientApi.get(`/api/posts/${userId}/all`);
      return data;
    } else {
      const { data } = await clientApi.get("/api/posts");
      return data;
    }
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
    await queryClient.invalidateQueries("PostDetail");
    await queryClient.invalidateQueries("PostReplies");
    await queryClient.invalidateQueries("UserDetail");
    console.log("like action end!");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getPostReposts = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    if (!id) {
      return "No Post";
    }
    const { data } = await axios.get(`/api/posts/${id}/reposts`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const repostPost = async (token, id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(`/api/posts/${id}/reposts`, config);
    await queryClient.invalidateQueries("Posts");
    await queryClient.invalidateQueries("PostReTweets");
    await queryClient.invalidateQueries("PostDetail");
    await queryClient.invalidateQueries("UserDetail");

    console.log("like action end!");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const suggestionsToUser = async () => {
  try {
    const { data } = await clientApi.get("/api/users");
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const setHandlerFollow = async (token, id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(`/api/users/${id}/follow`, config);
    await queryClient.invalidateQueries("suggestions");
    await queryClient.invalidateQueries("Posts");
    await queryClient.invalidateQueries("UserDetail");
    console.log("follow action end!");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getUserFollowers = async () => {};
export const getTrends = async () => {
  /* try {
    const { data } = await axios.get(`/api/posts/trands`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }*/
};

export const getNotifications = () => async () => {};
export const getFriends = async () => {};
export const getSearchResults = async () => {};
export const readNotification = async () => {};
