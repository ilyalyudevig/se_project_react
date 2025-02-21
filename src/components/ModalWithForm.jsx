function ModalWithForm({
  title,
  name,
  buttonText,
  handleCloseModal,
  activeModal,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          className="modal__close-button"
          onClick={(e) => handleCloseModal(e)}
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form form" name={name} onSubmit={onSubmit}>
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
