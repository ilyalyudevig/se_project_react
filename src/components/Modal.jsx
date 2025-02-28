import { useModalClose } from "../hooks/useModalClose";

function Modal({ name, isOpen, onClose, activeModal, layout, children }) {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div
        className={`modal__container modal__container_type_${name} ${
          layout === "v2" ? "modal__container_item-v2" : ""
        }`}
      >
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
