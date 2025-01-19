import "./Header.css";

import headerLogo from "../../images/logo.png";
import userIcon from "../../images/user-icon.png";

function Header() {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="wtwr logo" />
          <p className="header__date">January 19, Tel Aviv</p>
        </div>
        <div className="header__container">
          <ul className="header__menu menu">
            <li className="menu__item">
              <a className="menu__link" href="#">
                + Add clothes
              </a>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="#">
                Terrence Tegegne
              </a>
            </li>
          </ul>
          <img className="header__user-icon" src={userIcon} />
        </div>
      </header>
    </>
  );
}

export default Header;
