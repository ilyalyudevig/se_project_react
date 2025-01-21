function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  activeModal,
  children,
}) {
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
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form form" name={name}>
          <fieldset className="form__fieldset">{children}</fieldset>
          <button
            className="form__submit-button"
            type="submit"
            aria-label="Submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
