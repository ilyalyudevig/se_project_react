function Button({ block, element, type = "submit", onClick, buttonText }) {
  return (
    <button
      className={`${block}__${element}-button button`}
      type={type}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
export default Button;
