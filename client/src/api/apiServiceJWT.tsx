import { User } from "../dataTypes";

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



const login = (user: User) => {
  return fetch(`${SERVER_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      const response = res.json();
      return response;
    })
    .then((response) => {
      localStorage.setItem('accessToken', response.accessToken);
    })
    .catch((err) => console.log(err));
};


const profile = (accessToken: string) => {
  return fetch(`${SERVER_URL}/me`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};


const logout = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};

export { signup, login, profile, logout }

