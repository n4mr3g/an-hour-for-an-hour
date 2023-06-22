import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../api/apiServiceJWT";
import { useAppSelector } from "../../redux/hooks";
import { UserFromBackend } from "../../dataTypes";
import { logoutUser } from "../../redux/userInfoSlice";
import { storeApp } from "../../redux/store";

export default function Navigation({ findOffers }: { findOffers: Function }) {
  const [listCount, setListCount] = useState<number>(8);

  let navigate = useNavigate();

  const loggedIn: boolean = useAppSelector((state) => state.userInfo.loggedIn);
  const user: UserFromBackend = useAppSelector((state) => state.userInfo);

  console.log("user", user);

  function handleSignOut() {
    logout("accessToken");
    storeApp.dispatch(logoutUser(user));
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
            {loggedIn && (
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
                  to={"/app"}
                >
                  {" "}
                  Log Out
                </Link>
              </>
            )}
            {!loggedIn && (
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
