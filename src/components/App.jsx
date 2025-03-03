import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

import { getWeather, temperature } from "../utils/weatherApi";
import { api } from "../utils/api";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { UserProfileContext } from "../contexts/UserProfileContext";

import { determineDayTime } from "../utils/determineDayTime";

const itemModalLayoutOptions = {
  vertical: "v1",
  horizontal: "v2",
};

function App() {
  const addGarmentModalName = "garment-form";
  const itemModalName = "item";
  const deleteConfirmationModalName = "delete-confirm";

  const [activeModal, setActiveModal] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [weatherData, setWeatherData] = useState("");
  const [items, setItems] = useState([]);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);

    api
      .getUserItems()
      .then((items) => setItems(items.reverse()))
      .catch((err) => console.error("Error fetching user clothing items:", err))
      .finally(() => setIsLoading(false));
  }, []);

  function handleAddItemsButtonClick() {
    setActiveModal(addGarmentModalName);
    setModalIsOpened(true);
  }

  function handleCardClick(e) {
    const id = parseInt(e.currentTarget.id);
    const item = items.find((item) => item._id === id);

    setActiveModal(itemModalName);
    setModalItem(item);
    setModalIsOpened(true);
  }

  function handleAddItemSubmit(name, imageUrl, weather) {
    const id = items[0]._id + 1;
    const newItem = {
      _id: id,
      name,
      imageUrl,
      weather,
    };

    setIsLoading(true);

    api
      .addItem(newItem)
      .then(() => setItems((prevItems) => [newItem, ...prevItems]))
      .then(() => handleCloseModal())
      .catch((err) => console.error("Error adding new item: ", err))
      .finally(() => setIsLoading(false));
  }

  function openConfirmationModal() {
    setActiveModal(deleteConfirmationModalName);
    setModalIsOpened(true);
  }

  function handleCardDelete() {
    setIsLoading(true);

    api
      .deleteItem(modalItem._id)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== modalItem._id)
        );
      })
      .then(() => handleCloseModal())
      .catch((err) => console.error("Error removing item: ", err))
      .finally(() => setIsLoading(false));
  }

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

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
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
            />
          }
        />
        <Route
          path="/profile"
          element={
            <UserProfileContext.Provider
              value={{ items, handleCardClick, handleAddItemsButtonClick }}
            >
              <Profile />
            </UserProfileContext.Provider>
          }
        />
      </Routes>
      <Footer />
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
        title={modalItem.name}
        imageUrl={modalItem.imageUrl}
        weather={modalItem.weather}
        layout={itemModalLayoutOptions.vertical}
        openConfirmationModal={openConfirmationModal}
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
  );
}

export default App;
