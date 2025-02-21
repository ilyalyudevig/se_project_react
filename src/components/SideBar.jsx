import userIcon from "../images/user-icon.png";

function SideBar() {
  return (
    <div className="profile__sidebar sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__user-icon"
          src={userIcon}
          alt="User profile picture"
        />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}
export default SideBar;
