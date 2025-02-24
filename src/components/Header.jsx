import { Link } from "react-router-dom";

import headerLogo from "../images/logo.png";
import userIcon from "../images/user-icon.png";

import ToggleSwitch from "./ToggleSwitch";
import AddItemButton from "./AddItemButton";

function Header({
  handleAddItemsButtonClick,
  location,
  isMobileMenuOpened,
  toggleMobileMenu,
  modalIsOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className={`header`}>
      <div className="header__container">
        <Link to={"/se_project_react/"}>
          <img className="header__logo" src={headerLogo} alt="wtwr logo" />
        </Link>
        <h1 className="header__date-location">
          {currentDate}, {location}
        </h1>
      </div>
      <button
        className={`header__mobile-menu-button header__mobile-menu-button--${
          isMobileMenuOpened ? "hidden" : "shown"
        }`}
        onClick={toggleMobileMenu}
      ></button>
      <button
        className={`header__close-menu-button header__close-menu-button--${
          isMobileMenuOpened ? "shown" : "hidden"
        }`}
        onClick={toggleMobileMenu}
      ></button>
      <div
        className={`header__container header__container--${
          isMobileMenuOpened && !modalIsOpened ? "shown" : "hidden"
        }`}
      >
        <ToggleSwitch />
        <AddItemButton
          blockName={"header"}
          onClick={handleAddItemsButtonClick}
          buttonText={"+ Add clothes"}
        />
        <Link
          to={"/se_project_react/profile"}
          onClick={toggleMobileMenu}
          className="header__user-info"
        >
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__user-icon"
            src={userIcon}
            alt="User profile picture"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
