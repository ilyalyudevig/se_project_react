import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Modal from "./Modal";

function ItemModal({
  activeModal,
  name,
  item,
  handleCloseModal,
  openConfirmationModal,
  layout,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = item.owner === currentUser._id;

  return (
    <Modal
      name={name}
      onClose={handleCloseModal}
      activeModal={activeModal}
      layout={layout}
    >
      <img
        className={`modal__image ${
          layout === "v2" ? "modal__image_item-v2" : ""
        }`}
        src={item.imageUrl}
        alt={item.title}
      />
      <div
        className={`modal__info-container modal__info-container_item-${
          layout === "v2" ? "v2" : "v1"
        }`}
      >
        <div
          className={`modal__title-container modal__title-container_item-${
            layout === "v2" ? "v2" : "v1"
          }`}
        >
          <h2
            className={`modal__title ${
              layout === "v2" ? "modal__title_item-v2" : "modal__title_item-v1"
            }`}
          >
            {item.name}
          </h2>
          {isOwn && (
            <button
              className={`modal__delete-button button ${
                layout === "v2" ? "modal__delete-button_item-v2" : ""
              }`}
              onClick={openConfirmationModal}
            >
              Delete item
            </button>
          )}
        </div>
        <p
          className={`modal__weather ${
            layout === "v2" ? "modal__weather_item-v2" : ""
          }`}
        >
          Weather: {item.weather}
        </p>
      </div>
    </Modal>
  );
}

export default ItemModal;
