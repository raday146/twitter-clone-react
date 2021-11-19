import axios from "axios";
const client = axios.create();

export async function authenticate() {
  return await client.get("/auth/login").then((res) => res.data.users);
}
export async function logIn() {}
export async function signUp() {}
export async function logOut() {}
export async function getNotification() {}
export async function readNotification() {}
