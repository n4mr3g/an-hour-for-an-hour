import { User } from "../dataTypes";

const SERVER_URL = "http://localhost:4000";

interface LoginResponse {
  accessToken: string;
}

const signup = async (user: User): Promise<Response> => {
  return await fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    // credentials: "include",
    // mode: "cors",
    headers: { "Content-Type": "application/json" },
    // headers: {['Authorization']: `Bearer ${localStorage.getItem("accessToken")}`},
    body: JSON.stringify(user),
  });

  // const response = await res.json();
  // console.log("response", response);
  // return response;

  // .then((res) => {
  // console.log(res, "res============");
  // let response = JSON.stringify(res.body);
  // return response;
  // })
  // .then((response) => {
  //   //Redirect to dashboard
  //   return response;
  // })
  // .catch((err) => console.log(err))
  // );
};

const login = (user: User): Promise<LoginResponse> => {
  return fetch(`${SERVER_URL}/login`, {
    method: "POST",
    credentials: "include",
    // mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res: FetchResponse) => res.json())
    .then((response: LoginResponse) => {
      console.log("User has successfully logged in!");
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { accessToken: "" };
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

export { signup, login, profile, logout };
