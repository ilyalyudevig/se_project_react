import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";

import { getWeather } from "../utils/weatherApi";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { UserProfileContext } from "../contexts/UserProfileContext";

import { defaultClothingItems } from "../utils/defaultClothingItems";
import { determineDayTime } from "../utils/determineDayTime";

const itemModalLayoutOptions = {
  vertical: "v1",
  horizontal: "v2",
};

function App() {
  const addGarmentModalName = "garment-form";
  const itemModalName = "item";

  const [activeModal, setActiveModal] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [weatherData, setWeatherData] = useState("");
  const [items, setItems] = useState(defaultClothingItems);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleCloseModal() {
    setActiveModal("");
    setIsMobileMenuOpened(false);
    setModalIsOpened(false);
  }

  useEffect(() => {
    if (!activeModal) return;

    function handleEscapeClose(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }
    document.addEventListener("keydown", handleEscapeClose);

    function handleOverlayClick(e) {
      if (
        Array.from(e.target.classList).includes(`modal_type_${activeModal}`)
      ) {
        handleCloseModal();
      }
    }
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [activeModal]);

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
    const id = items.length;
    const newItem = {
      _id: id,
      name,
      link: imageUrl,
      weather,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    handleCloseModal();
  }

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Error fetching weather data: ", err));
  }, []);

  const { sunrise, sunset, sky, location, weather, temp } = weatherData;

  const temperature = {
    F: Math.round(temp),
    C: Math.round(((temp - 32) * 5) / 9),
  };

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
    <>
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
            path="/se_project_react/"
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
            path="/se_project_react/profile"
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
        />
        <ItemModal
          name={itemModalName}
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
          title={modalItem.name}
          link={modalItem.link}
          weather={modalItem.weather}
          layout={itemModalLayoutOptions.vertical}
        />
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
