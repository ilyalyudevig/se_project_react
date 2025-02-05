import headerLogo from '../images/logo.png';
import userIcon from '../images/user-icon.png';

function Header({
  handleHeaderAddButtonClick,
  location,
  isMobileMenuOpened,
  toggleMobileMenu,
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <header className={`header`}>
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="wtwr logo" />
          <h1 className="header__date-location">
            {currentDate}, {location}
          </h1>
        </div>
        <button
          className={`header__mobile-menu-button header__mobile-menu-button--${
            isMobileMenuOpened ? 'hidden' : 'shown'
          }`}
          onClick={toggleMobileMenu}
        ></button>
        <button
          className={`header__close-menu-button header__close-menu-button--${
            isMobileMenuOpened ? 'shown' : 'hidden'
          }`}
          onClick={toggleMobileMenu}
        ></button>
        <div
          className={`header__container header__container--${
            isMobileMenuOpened ? 'shown' : 'hidden'
          }`}
        >
          <button
            className="header__add-button"
            type="button"
            onClick={() => handleHeaderAddButtonClick()}
          >
            + Add clothes
          </button>
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__user-icon" src={userIcon} />
        </div>
      </header>
    </>
  );
}

export default Header;
