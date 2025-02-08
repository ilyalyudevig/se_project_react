function ItemModal({
  activeModal,
  name,
  title,
  link,
  weather,
  handleCloseModal,
  layout,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? 'modal_opened' : ''
      }`}
    >
      <div
        className={`modal__container modal__container_type_${name} ${
          layout === 'v2' ? 'modal__container_item-v2' : ''
        }`}
      >
        <button
          className="modal__close-button"
          onClick={handleCloseModal}
        ></button>
        <img
          className={`modal__image ${
            layout === 'v2' ? 'modal__image_item-v2' : ''
          }`}
          src={link}
          alt={title}
        />
        <h2
          className={`modal__title ${
            layout === 'v2' ? 'modal__title_item-v2' : 'modal__title_item'
          }`}
        >
          {title}
        </h2>
        <p
          className={`modal__weather ${
            layout === 'v2' ? 'modal__weather_item-v2' : ''
          }`}
        >
          Weather: {weather}
        </p>
      </div>
    </div>
  );
}

export default ItemModal;
