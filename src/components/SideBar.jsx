import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import UserIcon from "./UserIcon";
import Button from "./Button";
import { UserProfileContext } from "../contexts/UserProfileContext";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);
  const { openEditProfileModal, handleSignOut } =
    useContext(UserProfileContext);

  return (
    <div className="profile__sidebar sidebar">
      <div className="sidebar__user-info">
        <UserIcon
          block={"sidebar"}
          avatar={currentUser.avatar}
          name={currentUser.name}
        />
        <div className="sidebar__username-container">
          <p className="sidebar__username">{currentUser.name}</p>
        </div>
      </div>
      <div className="sidebar__buttons">
        <Button
          block={"sidebar"}
          type={"change-profile"}
          buttonText={"Change profile data"}
          onClick={openEditProfileModal}
        />
        <Button
          block={"sidebar"}
          type={"logout"}
          buttonText={"Log Out"}
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
}
export default SideBar;
