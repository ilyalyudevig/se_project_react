function ItemModal({
  activeModal,
  name,
  title,
  link,
  weather,
  onClose,
  layout,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? 'modal_opened' : ''
      }`}
    >
      <div
        className={`modal__container ${
          layout === 'v2' ? 'modal__container_item-v2' : ''
        }`}
      >
        <button
          className="modal__close-button"
          onClick={(e) => onClose(e)}
        ></button>
        <img
          className={`modal__image ${
            layout === 'v2' ? 'modal__image_item-v2' : ''
          }`}
          src={link}
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
