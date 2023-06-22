import Navigation from "../Navigation/Navigation";
import "./SignIn.css";
import { login } from "../../api/apiServiceJWT.jsx";

import { useNavigate } from "react-router-dom";

import findOffers from "../../App.jsx";
import { LoginData, UserFromBackend } from "../../dataTypes.jsx";
import { useAppDispatch } from "../../redux/hooks.js";
import { loginUser } from "../../redux/userInfoSlice.js";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import DOMPurify from "dompurify";
import { storeApp } from "../../redux/store.js";

export default function SignIn() {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const navigate = useNavigate();
  const clean = DOMPurify.sanitize;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginData: LoginData = {
      email: clean(data.email),
      password: clean(data.password),
    };

    const response : UserFromBackend = await login(loginData);
``
    if (!response) {
      alert("Wrong email or password");
      reset();
      return;
    }

    storeApp.dispatch(loginUser(response));
    reset(); // Needed?
    navigate("/app");
  };
  
  return (
    <>
      <Navigation findOffers={findOffers} />
      <div className="form-container">
        <form className="form-itself" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title"> Log In </h2>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>

            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="E-mail"
              autoComplete="username"
              className="input-box"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>

            <input
              {...register("password", { required: true })}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="input-box"
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
