function Button({ block, type, onClick, buttonText }) {
  return (
    <button
      className={`${block}__${type}-button button`}
      type="button"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
export default Button;
