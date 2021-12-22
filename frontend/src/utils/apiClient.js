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
    await queryClient.invalidateQueries("PostDetail");
    await queryClient.invalidateQueries("PostReplies");
    await queryClient.invalidateQueries("Trends");
    await queryClient.invalidateQueries("UserDetail");
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
    await queryClient.invalidateQueries("Notifications");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getTrends = async () => {
  try {
    const { data } = await axios.get("/api/trends");

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getSearchResults = async ({ queryKey }) => {
  try {
    const input = String(queryKey[1]);
    const keyword = String(queryKey[1]).substring(
      1,
      String(queryKey[1]).length
    );

    let url = "";
    switch (input.charAt(0)) {
      case "#":
        url = `/api/trends/search-result?keyword=${keyword}`;
        break;
      case "@":
        url = `/api/users/search-result?keyword=${keyword}`;
        break;
      default:
        url = `/api/posts/search-result?keyword=${input}`;
    }
    console.log(url);
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getUserFollowers = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    const { data } = await axios.get(`/api/users/${id}/followers`);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getFriends = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    const { data } = await axios.get(`/api/users/${id}/friends`);
    console.log("327 api ", data);
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getNotifications = async ({ queryKey }) => {
  try {
    const token = queryKey[1];
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("/api/users/notifications", config);
    return data;
    //await queryClient.invalidateQueries("notifications");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const readNotification = async (token, notification) => {
  try {
    if (notification.read) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put("/api/users/readnotification", notification, config);
    await queryClient.invalidateQueries("Notifications");
    await queryClient.invalidateQueries("suggestions");
    await queryClient.invalidateQueries("Posts");
    await queryClient.invalidateQueries("UserDetail");
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
