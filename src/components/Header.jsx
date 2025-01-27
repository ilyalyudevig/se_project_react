import headerLogo from '../images/logo.png';
import userIcon from '../images/user-icon.png';

function Header({ handleHeaderAddButtonClick, location }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="wtwr logo" />
          <h1 className="header__date-location">
            {currentDate}, {location}
          </h1>
        </div>
        <div className="header__container">
          <button
            className="header__button"
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
