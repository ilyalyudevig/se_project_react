import Modal from "./Modal";
import Form from "./Form";
import Button from "./Button";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { MODAL_NAMES } from "../utils/constants";

function ModalWithForm({
  title,
  name,
  isOpen,
  buttonText,
  handleCloseModal,
  activeModal,
  onSubmit,
  children,
}) {
  const { isLoggedIn, openModal } = useContext(CurrentUserContext);

  return (
    <Modal
      name={name}
      onClose={handleCloseModal}
      activeModal={activeModal}
      isOpen={isOpen}
    >
      <h2 className="modal__title">{title}</h2>
      <Form name={name} onSubmit={onSubmit} buttonText={buttonText}>
        <fieldset className="form__fieldset">{children}</fieldset>
        <div className="form__buttons-container">
          <Button
            block="form"
            element="submit"
            type="submit"
            buttonText={buttonText}
          />
          {!isLoggedIn && (
            <Button
              block="form"
              element={title === "Sign Up" ? "login" : "signup"}
              type="button"
              onClick={() =>
                openModal(
                  title === "Sign Up" ? MODAL_NAMES.LOGIN : MODAL_NAMES.REGISTER
                )
              }
              buttonText={title === "Sign Up" ? "or Log In" : "or Sign Up"}
            />
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
