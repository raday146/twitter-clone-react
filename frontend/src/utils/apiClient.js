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
export const getNotifactions = async () => {};

export const readNotifactions = async () => {};
export const getPosts = async () => {};
export const getReplies = async () => {};
