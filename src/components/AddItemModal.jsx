import ModalWithForm from "./ModalWithForm";

import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  activeModal,
  addGarmentModalName,
  isLoading,
}) => {
  const { values, setValues, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        name: "",
        imageUrl: "",
        weather: "",
      }));
    }
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values.name, values.imageUrl, values.weather);
  }

  return (
    <ModalWithForm
      title="New garment"
      name={addGarmentModalName}
      buttonText={isLoading ? "Adding item..." : "Add garment"}
      handleCloseModal={onCloseModal}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
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
        value={values.name}
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="imageUrl">
        Image
      </label>
      <input
        className="form__input"
        type="url"
        name="imageUrl"
        id="imageUrl"
        placeholder="Image URL"
        minLength="2"
        required=""
        aria-label="Name"
        value={values.imageUrl}
        onChange={handleChange}
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
            onChange={handleChange}
            checked={values.weather === "hot"}
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
            onChange={handleChange}
            checked={values.weather === "warm"}
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
            onChange={handleChange}
            checked={values.weather === "cold"}
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
