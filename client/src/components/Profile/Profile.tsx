import { storeApp } from "../../redux/store";
import Button from "../Button/Button";
import "./Profile.css";

// import { useSelector } from "react-redux";
export default function Profile() {
  // const user = useSelector((state) => state.userInfo);
  const user = storeApp.getState().userInfo;

  return (
    <div className="profile_container">
      <img className="profile-image" src={user.image} alt="user" />

      <p className="profile-content name">{user.name}</p>
      <p className="profile-content email">{user.email}</p>
      <Button value="update" />
    </div>
  );
}
