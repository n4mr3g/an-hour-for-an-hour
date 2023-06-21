import Navigation from "../Navigation/Navigation";
import "./SignIn.css";
import { login, profile } from "../../api/apiServiceJWT.jsx";

import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/actions.js";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeApp } from "../../redux/store.js";

import findOffers from "../../App.jsx";
import { User, LoginData, UserFromBackend } from "../../dataTypes.jsx";
import { useAppDispatch } from "../../redux/hooks.js";
import { addUser } from "../../redux/userInfoSlice.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  // const userInfo = useSelector((state) => state.userInfo);
  // const userInfo = storeApp.getState().userInfo;


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter details correctly");
      return;
    }

    const loginData: LoginData = {
      email: email,
      password: password,
    }

    const userData: UserFromBackend = await login(loginData);

    // const userLoggedIn = JSON.parse(userDataString).user
    console.log(userData, 'userLoggedIn');

    let newUser = { name: userData.name, password: '', image: '', email: userData.email }
    // const userLoggedIn: User = await JSON.parse(userDataString);

    dispatch(addUser(userData));

    // if (res === '') {
    //   alert('bad credentials.');
    //   setEmail("");
    //   setPassword("");
    // } else {
    //   const accessToken = res;
    //   localStorage.setItem("accessToken", accessToken);
    //   setEmail("");
    //   setPassword("");

    //   const prof = await profile(accessToken);
    //   // dispatch(loginAction(prof));
    //   storeApp.dispatch(loginAction(true));
    //   console.log('log in')
    navigate("/app");
    // }
  }
  return (
    <>
      <Navigation findOffers={findOffers} />
      <div className="form-container">
        <form className="form-itself" onSubmit={handleSubmit}>
          <div className="form--title"> Log In </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              className="input-box"
              type="text"
              name="name"
              value={email}
              placeholder="Enter a valid email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-box"
              type="password"
              name="name"
              value={password}
              placeholder="Length of minimum 8 characters"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className="create-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
