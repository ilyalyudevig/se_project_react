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
        <div className="sidebar__username-container">
          <p className="sidebar__username">Terrence Tegegne</p>
          <button className={"sidebar__profile-button button"}>
            Changle profile data
          </button>
          <button className={"sidebar__profile-button button"}>Log out</button>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
