function ItemModal({ activeModal, name, title, link, weather, onClose }) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? 'modal_opened' : ''
      }`}
    >
      <div className="modal__container">
        <button
          className="modal__close-button"
          onClick={(e) => onClose(e)}
        ></button>
        <img className="modal__image" src={link} />
        <h2 className="modal__title modal__title_item">{title}</h2>
        <p className="modal__weather">Weather: {weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
