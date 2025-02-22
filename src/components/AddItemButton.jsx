function AddItemButton({ blockName, onClick, buttonText }) {
  return (
    <button
      className={`${blockName}__add-button button`}
      type="button"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
export default AddItemButton;
