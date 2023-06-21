import { UserFromBackend } from "../../dataTypes";
import { useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";
import "./Profile.css";
export default function Profile() {
  const user: UserFromBackend = useAppSelector((state) => state.userInfo[0]);

  return (
    <div className="profile_container">
      <img className="profile-image" src={user.image} alt="user" />

      <p className="profile-content name">{user.name}</p>
      <p className="profile-content email">{user.email}</p>
      <Button value="update" />
    </div>
  );
}
