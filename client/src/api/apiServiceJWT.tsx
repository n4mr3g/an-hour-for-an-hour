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
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "RESkasdjhflkjasdjfkasjf!!!!");
      if (!res) {
        throw new Error("Wrong email or password");
      }
      localStorage.setItem("accessToken", res.accessToken);
      return res.user;
    })
    .catch((err) => {
      console.log(err, "ERROR!!!!!!!!!!!");
      console.error(err);
    });
};

const profile = (accessToken: string) => {
  return fetch(`${SERVER_URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("Error", err));
};

const logout = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};

export { signup, login, logout, profile };
