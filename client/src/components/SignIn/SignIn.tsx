import Navigation from "../Navigation/Navigation";
import "./SignIn.css";
import { login, profile } from "../../api/apiServiceJWT.jsx";

import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions.js";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeApp } from "../../store.js";

import findOffers from "../../App.jsx";
import { User, LoginData } from "../../dataTypes.jsx";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.userInfo);
  const userInfo = storeApp.getState().userInfo;


  // type ResponseLogin = {

  // }


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


    const res: string = await login(loginData);
    if (res === '') {
      alert('bad credentials.');
      setEmail("");
      setPassword("");
    } else {
      const accessToken = res;
      localStorage.setItem("accessToken", accessToken);
      setEmail("");
      setPassword("");

      const prof = await profile(accessToken);
      // dispatch(loginAction(prof));
      storeApp.dispatch(loginAction(true));
      console.log('log in')
      navigate("/app");
    }
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
