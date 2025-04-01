import ModalWithForm from "./ModalWithForm";
import Input from "./Input";

import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

const LoginModal = ({
  isOpen,
  onCloseModal,
  activeModal,
  isLoading,
  loginModalName,
  handleLogin,
}) => {
  const { values, setValues, handleChange } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        email: "",
        password: "",
      }));
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (
    <ModalWithForm
      name={loginModalName}
      title="Log In"
      buttonText={isLoading ? "Logging you in..." : "Log In"}
      handleCloseModal={onCloseModal}
      activeModal={activeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        label="Email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default LoginModal;
