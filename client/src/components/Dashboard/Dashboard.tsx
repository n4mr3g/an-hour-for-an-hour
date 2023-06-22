import "./Dashboard.css";
import Navigation from "../Navigation/Navigation";
import Menu from "../Menu/Menu";
import { Outlet } from "react-router-dom";
import findOffers from "../../App.jsx";
import { UserFromBackend } from "../../dataTypes.jsx";
import { useAppSelector } from "../../redux/hooks.js";

export default function Dashboard() {
  const loggedIn: boolean = useAppSelector((state) => state.userInfo.loggedIn);
  const user: UserFromBackend = useAppSelector((state) => state.userInfo);

  return (
    <div>
      <Navigation findOffers={findOffers} />
      {/* TODO put a condition here also */}
      {loggedIn && <Menu />}
      <div className="dashboard-container">
        {loggedIn && <Outlet></Outlet>}
        {/* TODO may be it might be a good idea to keep track if someone is logged or not here and then not show if user is not logged in. */}
      </div>
    </div>
  );
}
