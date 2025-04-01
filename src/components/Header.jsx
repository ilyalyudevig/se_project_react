import { Link } from "react-router-dom";

import headerLogo from "../images/logo.png";

import ToggleSwitch from "./ToggleSwitch";
import Button from "./Button";
import UserIcon from "./UserIcon";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({
  openSignUpModal,
  openSignInModal,
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

  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  return (
    <header className={`header`}>
      <div className="header__container">
        <Link to={"/"} className="header__logo">
          <img src={headerLogo} alt="wtwr logo" />
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
        {isLoggedIn ? (
          <>
            <Button
              block={"header"}
              onClick={handleAddItemsButtonClick}
              buttonText={"+ Add clothes"}
            />
            <Link
              to={"/profile"}
              onClick={toggleMobileMenu}
              className="header__user-info"
            >
              <p className="header__username">{currentUser.name}</p>
              <UserIcon
                block={"header"}
                avatar={currentUser.avatar}
                name={currentUser.name}
              />
            </Link>
          </>
        ) : (
          <>
            <Button
              block={"header"}
              type={"signup"}
              onClick={openSignUpModal}
              buttonText={"Sign Up"}
            />
            <Button
              block={"header"}
              type={"signin"}
              onClick={openSignInModal}
              buttonText={"Log In"}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
