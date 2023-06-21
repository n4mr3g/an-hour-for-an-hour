import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { logout } from "../../api/apiServiceJWT";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserFromBackend } from "../../dataTypes";
import { logoutUser } from "../../redux/userInfoSlice";

export default function Navigation({ findOffers }: { findOffers: Function }) {
  const [listCount, setListCount] = useState<number>(8);

  let navigate = useNavigate();

  const user: UserFromBackend = useAppSelector((state) => state.userInfo[0]);
  console.log("userLogged", user);

  const dispatch = useAppDispatch();
  function handleSignOut() {
    logout("accessToken");
    dispatch(logoutUser(user));
    navigate("/");
  }


  return (
    <nav>
      <div className="navigation-container">
        <Link to={"/app"} className="logo same-width">
          Hour One
        </Link>
        <SearchBar findOffers={findOffers} />
        <div className="nav-options same-width ">
          <div className="mylist-wrapper">
            {user && (
              <>
                <Link to={"/app/dashboard/profile"} className="my-list">
                  Dashboard
                </Link>
                <div className={listCount > 0 ? "list-count" : ""}>
                  {listCount > 0 ? listCount : ""}
                </div>
                <img className="user-image" src={user.image} alt={user.name} />
                <Link
                  onClick={handleSignOut}
                  className="signout-link"
                  to={"/app/signup"}
                >
                  {" "}
                  Log Out
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link className="signup-link" to={"/app/signup"}>
                  {" "}
                  Sign Up
                </Link>
                <Link className="signin-link" to={"/app/signin"}>
                  {" "}
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
