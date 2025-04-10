import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";

import { getWeather, temperature } from "../utils/weatherApi";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { UserProfileContext } from "../contexts/UserProfileContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { determineDayTime } from "../utils/determineDayTime";
import ProtectedRoute from "./ProtectedRoute";

import { MODAL_NAMES, ITEM_MODAL_LAYOUT_OPTIONS } from "../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [weatherData, setWeatherData] = useState("");
  const [items, setItems] = useState([]);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prevState) => !prevState);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setModalIsOpened(true);
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setIsMobileMenuOpened(false);
    setModalIsOpened(false);
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const handleAddItemsButtonClick = () => {
    openModal(MODAL_NAMES.ADD_GARMENT);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleRegistration(inputValues) {
    function makeRequest() {
      return auth
        .register(inputValues)
        .then(() =>
          handleLogin({
            email: inputValues.registerEmail,
            password: inputValues.registerPassword,
          })
        );
    }
    handleSubmit(makeRequest);
  }

  function handleLogin(inputValues) {
    function makeRequest() {
      return auth
        .authorize(inputValues)
        .then((data) => {
          if (data.token) {
            setToken(data.token);
            return auth.checkToken(data.token);
          }
        })
        .then(setCurrentUser)
        .then(setIsLoggedIn(true));
    }
    handleSubmit(makeRequest);
  }

  function handleAddItemSubmit(inputValues) {
    const token = getToken();
    function makeRequest() {
      return api
        .addItem({ ...inputValues, likes: [] }, token)
        .then((newItem) => setItems((prevItems) => [newItem, ...prevItems]));
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete() {
    const token = getToken();

    function makeRequest() {
      return api.deleteItem(modalItem._id, token).then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== modalItem._id)
        );
      });
    }
    handleSubmit(makeRequest);
  }

  function handleEditProfile(inputValues) {
    const token = getToken();

    function makeRequest() {
      return api.editProfile(token, inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  const handleCardClick = (e) => {
    const id = e.currentTarget.id;
    const item = items.find((item) => item._id === id);
    setActiveModal(MODAL_NAMES.ITEM);
    setModalItem(item);
    setModalIsOpened(true);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    const likeAction = !isLiked
      ? api.addCardLike(id, token)
      : api.removeCardLike(id, token);
    likeAction
      .then((updatedCard) => {
        setItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    setIsLoading(true);
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api
      .getUserItems()
      .then(({ items }) => setItems(items.reverse()))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getWeather().then(setWeatherData).catch(console.error);
  }, []);

  const { sunrise, sunset, sky, location, weather } = weatherData;
  const currentTime = Math.floor(Date.now() / 1000);
  const isDayTime = determineDayTime(sunrise, sunset, currentTime);

  const defaultWeatherCard = {
    name: `${isDayTime ? "Day" : "Night"} ${sky}`,
    image: new URL(
      `../images/default-${isDayTime ? "d" : "n"}.png`,
      import.meta.url
    ).href,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ isLoading, isLoggedIn, currentUser, openModal }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          openSignUpModal={() => openModal(MODAL_NAMES.REGISTER)}
          openSignInModal={() => openModal(MODAL_NAMES.LOGIN)}
          handleAddItemsButtonClick={handleAddItemsButtonClick}
          location={location}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          modalIsOpened={modalIsOpened}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherCard={defaultWeatherCard}
                handleCardClick={handleCardClick}
                items={items.filter((item) => item.weather === weather)}
                temp={temperature[currentTemperatureUnit]}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <UserProfileContext.Provider
                value={{
                  items,
                  handleCardClick,
                  onCardLike: handleCardLike,
                  handleAddItemsButtonClick,
                  handleSignOut,
                  openEditProfileModal: () =>
                    openModal(MODAL_NAMES.EDIT_PROFILE),
                }}
              >
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </UserProfileContext.Provider>
            }
          />
        </Routes>
        <Footer />
        <RegisterModal
          isOpen={modalIsOpened}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          isLoading={isLoading}
          registerModalName={MODAL_NAMES.REGISTER}
          handleRegistration={handleRegistration}
          switchBtnClass="login"
          switchBtnHandler={() => openModal(MODAL_NAMES.LOGIN)}
          switchBtnText="Log In"
        />
        <LoginModal
          isOpen={modalIsOpened}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          isLoading={isLoading}
          loginModalName={MODAL_NAMES.LOGIN}
          handleLogin={handleLogin}
          switchBtnClass="signup"
          switchBtnHandler={() => openModal(MODAL_NAMES.REGISTER)}
          switchBtnText="Sign Up"
        />
        <EditProfileModal
          isOpen={modalIsOpened}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          isLoading={isLoading}
          editProfileModalName={MODAL_NAMES.EDIT_PROFILE}
          handleEditProfile={handleEditProfile}
        />
        <AddItemModal
          isOpen={modalIsOpened}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          addGarmentModalName={MODAL_NAMES.ADD_GARMENT}
          isLoading={isLoading}
        />
        <ItemModal
          name={MODAL_NAMES.ITEM}
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
          item={modalItem}
          layout={ITEM_MODAL_LAYOUT_OPTIONS.VERTICAL}
          openConfirmationModal={() => openModal(MODAL_NAMES.DELETE_CONFIRM)}
          isOpen={modalIsOpened}
        />
        <DeleteConfirmationModal
          name={MODAL_NAMES.DELETE_CONFIRM}
          activeModal={activeModal}
          handleCardDelete={handleCardDelete}
          handleCloseModal={handleCloseModal}
          isLoading={isLoading}
          isOpen={modalIsOpened}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
