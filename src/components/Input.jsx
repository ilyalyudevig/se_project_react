function Input({
  label,
  type = "text",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  value,
  onChange,
  checked,
  id,
}) {
  return type !== "radio" ? (
    <>
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form__input"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </>
  ) : (
    <div className="form__input-container">
      <input
        className="form__input form__input_radio"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className="form__label form__label_radio" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default Input;
