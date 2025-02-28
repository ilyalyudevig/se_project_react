function Form({ name, onSubmit, children }) {
  return (
    <form className="modal__form form" name={name} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
export default Form;
