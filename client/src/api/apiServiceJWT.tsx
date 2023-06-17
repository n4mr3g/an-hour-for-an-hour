import { LoginData, User } from "../dataTypes";

const SERVER_URL = "http://localhost:4000";

const signup = (user: User) => {
  return fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const login = (loginData: LoginData) => {
  return fetch(`${SERVER_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  })
    .then((res) => {
      const response = res.json();
      return response;
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    })
    .catch((err) => console.log(err));
};

const profile = (accessToken: string) => {
  return fetch(`${SERVER_URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("Error", err));
};

const logout = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};

export { signup, login, logout, profile };
