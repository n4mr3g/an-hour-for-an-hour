import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout } from "../../api/apiServiceJWT";
import { storeApp } from "../../store";
import { loginAction } from "../../actions";

export default function Navigation({ findOffers }: { findOffers: Function }) {
  const [listCount, setListCount] = useState<number>(8);

  // const user = useSelector(userInfo, shallowEqual);
  const user = storeApp.getState().userInfo;

  const dispatch = useDispatch();

  function handleSignOut() {
    logout("accessToken");
    // dispatch(profile(''));
    dispatch(loginAction(false));
  }

  return (
    <nav>
      <div className="navigation-container">
        <a href="/app" className="logo same-width ">
          Hour One
        </a>
        {/* <div className="logo same-width ">Hour One</div> */}
        <SearchBar findOffers={findOffers} />
        <div className="nav-options same-width ">
          <div className="mylist-wrapper">
            {user.email && (
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
            {!user.name && (
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
