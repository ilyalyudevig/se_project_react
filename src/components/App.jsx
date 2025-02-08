import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';
import { getWeather } from '../utils/weatherApi';

import { defaultClothingItems } from '../utils/defaultClothingItems';
import { determineDayTime } from '../utils/determineDayTime';

const itemModalLayoutOptions = {
  vertical: 'v1',
  horizontal: 'v2',
};

function App() {
  const addGarmentModalName = 'garment-form';
  const itemModalName = 'item';

  const [activeModal, setActiveModal] = useState('');
  const [modalItem, setModalItem] = useState({});
  const [weatherData, setWeatherData] = useState('');
  const [items, setItems] = useState(defaultClothingItems);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleCloseModal() {
    setActiveModal('');
    setIsMobileMenuOpened(false);
    setModalIsOpened(false);
  }

  useEffect(() => {
    if (!activeModal) return;

    function handleEscapeClose(e) {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    }
    document.addEventListener('keydown', handleEscapeClose);

    function handleOverlayClick(e) {
      if (
        Array.from(e.target.classList).includes(`modal_type_${activeModal}`)
      ) {
        handleCloseModal();
      }
    }
    document.addEventListener('click', handleOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [activeModal]);

  function handleHeaderAddButtonClick() {
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

  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error('Error fetching weather data: ', err));
  }, []);

  const { sunrise, sunset, sky, location, weather, temp } = weatherData;
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const isDayTime = determineDayTime(sunrise, sunset, currentTime);

  const defaultWeatherCard = {
    name: `${isDayTime ? 'Day' : 'Night'} ${sky}`,
    image: new URL(
      `../images/default-${isDayTime ? 'd' : 'n'}.png`,
      import.meta.url
    ).href,
  };

  return (
    <>
      <Header
        handleHeaderAddButtonClick={handleHeaderAddButtonClick}
        location={location}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpened={isMobileMenuOpened}
        modalIsOpened={modalIsOpened}
      />
      <Main
        weatherCard={defaultWeatherCard}
        handleCardClick={handleCardClick}
        items={items.filter((item) => item.weather === weather)}
        temp={Math.round(temp)}
      />
      <Footer />
      <ModalWithForm
        title="New garment"
        name={addGarmentModalName}
        buttonText="Add garment"
        handleCloseModal={handleCloseModal}
        activeModal={activeModal}
      >
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required=""
          aria-label="Name"
        />
        <label className="form__label" htmlFor="url">
          Image
        </label>
        <input
          className="form__input"
          type="url"
          name="url"
          id="url"
          placeholder="Image URL"
          minLength="2"
          maxLength="40"
          required=""
          aria-label="Name"
        />
        <fieldset className="form__fieldset form__fieldset_radio">
          <legend className="form__legend">Select the weather type:</legend>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="weather"
              id="hot"
              value="hot"
            />
            <label className="form__label form__label_radio" htmlFor="hot">
              Hot
            </label>
          </div>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="weather"
              id="warm"
              value="warm"
            />
            <label className="form__label form__label_radio" htmlFor="warm">
              Warm
            </label>
          </div>
          <div className="form__input-container">
            <input
              className="form__input form__input_radio"
              type="radio"
              name="weather"
              id="cold"
              value="cold"
            />
            <label className="form__label form__label_radio" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        name={itemModalName}
        activeModal={activeModal}
        handleCloseModal={handleCloseModal}
        title={modalItem.name}
        link={modalItem.link}
        weather={modalItem.weather}
        layout={itemModalLayoutOptions.vertical}
      />
    </>
  );
}

export default App;
