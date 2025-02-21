import ModalWithForm from "./ModalWithForm";

import { useEffect, useState } from "react";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, activeModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(name, imageUrl, weather);
  }

  return (
    <ModalWithForm
      title="New garment"
      name={"garment-form"}
      buttonText="Add garment"
      handleCloseModal={onCloseModal}
      activeModal={activeModal}
      onSubmit={handleSubmit}
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
        value={name}
        onChange={onNameChange}
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
        required=""
        aria-label="Name"
        value={imageUrl}
        onChange={onImageUrlChange}
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
            onChange={onWeatherChange}
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
            onChange={onWeatherChange}
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
            onChange={onWeatherChange}
          />
          <label className="form__label form__label_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
