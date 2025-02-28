import Modal from "./Modal";
import Form from "./Form";

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
      <Form name={name} onSubmit={onSubmit} buttonText={buttonText}>
        <fieldset className="form__fieldset">{children}</fieldset>
        <button
          className={`form__submit-button form__submit-button_type_${name}`}
          type="submit"
          aria-label="Submit"
        >
          {buttonText}
        </button>
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
