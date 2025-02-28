import Modal from "./Modal";

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
    <Modal name={name} onClose={handleCloseModal} activeModal={activeModal}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form form" name={name} onSubmit={onSubmit}>
        <fieldset className="form__fieldset">{children}</fieldset>
        <button
          className={`form__submit-button form__submit-button_type_${name}`}
          type="submit"
          aria-label="Submit"
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
