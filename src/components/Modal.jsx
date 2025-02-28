import { useEffect } from "react";

function Modal({ name, onClose, activeModal, layout, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? "modal_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      {/* the container for the contents */}
      <div
        className={`modal__container modal__container_type_${name} ${
          layout === "v2" ? "modal__container_item-v2" : ""
        }`}
      >
        {/* add the close button */}
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        {/* here will be anything you add as `children`*/}
        {children}
      </div>
    </div>
  );
}

export default Modal;
