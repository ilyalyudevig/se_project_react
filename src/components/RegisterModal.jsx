import ModalWithForm from "./ModalWithForm";
import Input from "./Input";

import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

const RegisterModal = ({
  isOpen,
  onCloseModal,
  activeModal,
  isLoading,
  registerModalName,
  handleRegistration,
}) => {
  const { values, setValues, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        email: "",
        password: "",
        name: "",
        avatarUrl: "",
      }));
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  return (
    <ModalWithForm
      name={registerModalName}
      title="Sign Up"
      buttonText={isLoading ? "Creating account..." : "Sign Up"}
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
      <Input
        label="Name"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Avatar URL"
        name="avatarUrl"
        placeholder="Avatar"
        value={values.avatarUrl}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
