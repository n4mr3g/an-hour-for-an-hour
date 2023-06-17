import "./Dashboard.css";
import Navigation from "../Navigation/Navigation";
import Menu from "../Menu/Menu";
import { Outlet } from "react-router-dom";
import { storeApp } from "../../store";
import findOffers from "../../App.jsx";

export default function Dashboard() {
  // const user = useSelector((state) => state.userInfo);
  const user = storeApp.getState().userInfo;

  return (
    <div>
      <Navigation findOffers={findOffers} />
      {/* TODO put a condition here also */}
      {user.name && <Menu />}
      <div className="dashboard-container">
        {user.name && <Outlet></Outlet>}
        {/* TODO may be it might be a good idea to keep track if someone is logged or not here and then not show if user is not logged in. */}
      </div>
    </div>
  );
}
