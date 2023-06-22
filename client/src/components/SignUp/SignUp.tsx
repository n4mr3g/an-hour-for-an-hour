import "./signup.css";
import { signup } from "../../api/apiServiceJWT.jsx";
import Navigation from "../Navigation/Navigation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import React from "react";
import findOffers from "../../App.jsx";
import { User } from "../../dataTypes.jsx";

import DOMPurify from "dompurify";

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  email: Yup.string().email("Please enter a valid email address"),
  name: Yup.string()
    .required("Please enter your name")
    .min(3, "Name should be at least 3 characters")
    .max(40, "Name cannot exceed 40 characters"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  console.log(errors);
  let navigate = useNavigate();

  const clean = DOMPurify.sanitize;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newUserData: User = {
      name: clean(data.name),
      email: clean(data.email),
      password: clean(data.password),
      image: clean(""),
    };

    const res = await signup(newUserData);
    let accessToken: string = "";
    console.log(res, "RES!!!!");
    if (res.hasOwnProperty('error')) {
      alert("Email already in use");
      reset();
    } else {
      accessToken = res as string;
      localStorage.setItem("accessToken", accessToken);
      reset(); // Needed?
      navigate("/app/signin");
    }
  };

  return (
    <>
      <Navigation findOffers={findOffers} />
      <div className="form-container">
        <form className="form-itself" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title"> Join Hour One </h2>

          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              type="text"
              autoFocus={true}
              placeholder="Your full name"
              className="input-box"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
          </div>
          {errors.name && <p role="alert">{errors.name.message}</p>}

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="E-mail"
              autoComplete="username"
              className="input-box"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          {errors.email && <p role="alert">{errors.email.message}</p>}

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>

            <input
              {...register("password", { required: true, minLength: 8 })}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="input-box"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p role="alert">{errors.password.message}</p>}

            <label className="input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
              })}
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="input-box"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p role="alert">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="create-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
