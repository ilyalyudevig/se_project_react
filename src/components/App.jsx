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

import { getWeather, temperature } from "../utils/weatherApi";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { UserProfileContext } from "../contexts/UserProfileContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { determineDayTime } from "../utils/determineDayTime";
import ProtectedRoute from "./ProtectedRoute";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";

const itemModalLayoutOptions = {
  vertical: "v1",
  horizontal: "v2",
};

function App() {
  const addGarmentModalName = "garment-form";
  const itemModalName = "item";
  const deleteConfirmationModalName = "delete-confirm";
  const registerModalName = "signup-form";
  const loginModalName = "login-form";
  const editProfileModalName = "edit-profile-form";

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
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function toggleMobileMenu() {
    setIsMobileMenuOpened((isMobileMenuOpened) => !isMobileMenuOpened);
  }

  function handleCloseModal() {
    setActiveModal("");
    setIsMobileMenuOpened(false);
    setModalIsOpened(false);
  }

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    auth
      .register(email, password, name, avatarUrl)
      .then(() => handleLogin({ email, password }))
      .then(() => handleCloseModal())
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return auth.checkToken(data.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .then(() => handleCloseModal())
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  function handleAddItemsButtonClick() {
    setActiveModal(addGarmentModalName);
    setModalIsOpened(true);
  }

  function handleAddItemSubmit(name, imageUrl, weather) {
    const token = getToken();

    setIsLoading(true);

    api
      .addItem(
        {
          name,
          imageUrl,
          weather,
          likes: [],
        },
        token
      )
      .then((newItem) => setItems((prevItems) => [newItem, ...prevItems]))
      .then(() => handleCloseModal())
      .catch((err) => console.error("Error adding new item: ", err))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete() {
    const token = getToken();

    setIsLoading(true);

    api
      .deleteItem(modalItem._id, token)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== modalItem._id)
        );
      })
      .then(() => handleCloseModal())
      .catch((err) => console.error("Error removing item: ", err))
      .finally(() => setIsLoading(false));
  }

  function handleEditProfile({ name, avatar }) {
    const token = getToken();
    setIsLoading(true);

    api
      .editProfile(token, { name, avatar })
      .then((user) => setCurrentUser(user))
      .then(() => handleCloseModal())
      .catch((err) => console.error("Error removing item: ", err))
      .finally(() => setIsLoading(false));
  }

  function handleCardClick(e) {
    const id = e.currentTarget.id;
    const item = items.find((item) => item._id === id);
    setActiveModal(itemModalName);
    setModalItem(item);
    setModalIsOpened(true);
  }

  function handleCardLike({ id, isLiked }) {
    const token = getToken();
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  }

  function openModal(modalName) {
    setActiveModal(modalName);
    setModalIsOpened(true);
  }

  useEffect(() => {
    setIsLoading(true);
    const token = getToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    api
      .getUserItems()
      .then(({ items }) => Array.from(items))
      .then((items) => {
        setItems(items.reverse());
      })
      .catch((err) => console.error("Error fetching user clothing items:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Error fetching weather data: ", err));
  }, []);

  const { sunrise, sunset, sky, location, weather } = weatherData;

  const currentTime = Math.floor(new Date().getTime() / 1000);
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
      value={{ isLoading, isLoggedIn, setIsLoggedIn, currentUser }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          openSignUpModal={() => openModal(registerModalName)}
          openSignInModal={() => openModal(loginModalName)}
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
                  openEditProfileModal: () => openModal(editProfileModalName),
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
          registerModalName={registerModalName}
          handleRegistration={handleRegistration}
        />
        <LoginModal
          isOpen={modalIsOpened}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          isLoading={isLoading}
          loginModalName={loginModalName}
          handleLogin={handleLogin}
        />
        <EditProfileModal
          isOpen={modalIsOpened}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          isLoading={isLoading}
          editProfileModalName={editProfileModalName}
          handleEditProfile={handleEditProfile}
        />
        <AddItemModal
          isOpen={modalIsOpened}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
          activeModal={activeModal}
          addGarmentModalName={addGarmentModalName}
          isLoading={isLoading}
        />
        <ItemModal
          name={itemModalName}
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
          item={modalItem}
          layout={itemModalLayoutOptions.vertical}
          openConfirmationModal={() => openModal(deleteConfirmationModalName)}
          isOpen={modalIsOpened}
        />
        <DeleteConfirmationModal
          name={deleteConfirmationModalName}
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
