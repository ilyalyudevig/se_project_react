function DeleteConfirmationModal({
  activeModal,
  name,
  handleCloseModal,
  handleCardDelete,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? "modal_opened" : ""
      }`}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        <button className="modal__close-button" onClick={handleCloseModal} />
        <h2 className={`modal__title modal__title_type_${name}`}>
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          className="modal__confirm-delete-button button"
          type="button"
          onClick={handleCardDelete}
        >
          Yes, delete item
        </button>
        <button
          className="modal__cancel-button button"
          type="button"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
