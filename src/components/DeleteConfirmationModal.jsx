import Modal from "./Modal";

function DeleteConfirmationModal({
  activeModal,
  name,
  isOpen,
  handleCloseModal,
  handleCardDelete,
  isLoading,
}) {
  return (
    <Modal
      name={name}
      onClose={handleCloseModal}
      activeModal={activeModal}
      isOpen={isOpen}
    >
      <h2 className={`modal__title modal__title_type_${name}`}>
        Are you sure you want to delete this item? This action is irreversible.
      </h2>
      <button
        className="modal__confirm-delete-button button"
        type="button"
        onClick={handleCardDelete}
      >
        {isLoading ? "Deleting item..." : "Yes, delete item"}
      </button>
      <button
        className="modal__cancel-button button"
        type="button"
        onClick={handleCloseModal}
      >
        Cancel
      </button>
    </Modal>
  );
}
export default DeleteConfirmationModal;
