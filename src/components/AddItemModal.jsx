import ModalWithForm from "./ModalWithForm";
import Input from "./Input";

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
    itemName: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        itemName: "",
        imageUrl: "",
        weather: "",
      }));
    }
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
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
      <Input
        label="Name"
        name="itemName"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        value={values.itemName}
        onChange={handleChange}
      />
      <Input
        label="Image"
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        minLength="2"
        required
        value={values.imageUrl}
        onChange={handleChange}
      />
      <fieldset className="form__fieldset form__fieldset_radio">
        <legend className="form__legend">Select the weather type:</legend>
        <Input
          type="radio"
          name="weather"
          id="hot"
          value="hot"
          onChange={handleChange}
          checked={values.weather === "hot"}
          label="Hot"
        />
        <Input
          type="radio"
          name="weather"
          id="warm"
          value="warm"
          onChange={handleChange}
          checked={values.weather === "warm"}
          label="Warm"
        />
        <Input
          type="radio"
          name="weather"
          id="cold"
          value="cold"
          onChange={handleChange}
          checked={values.weather === "cold"}
          label="Cold"
        />
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
