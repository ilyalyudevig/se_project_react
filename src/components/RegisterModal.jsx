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
  switchBtnClass,
  switchBtnHandler,
  switchBtnText,
}) => {
  const { values, setValues, handleChange } = useForm({
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    registerAvatarUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        registerEmail: "",
        registerPassword: "",
        registerName: "",
        registerAvatarUrl: "",
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
      swiswitchBtnClass={switchBtnClass}
      switchBtnHandler={switchBtnHandler}
      switchBtnText={switchBtnText}
    >
      <Input
        type="email"
        label="Email *"
        name="registerEmail"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        label="Password *"
        name="registerPassword"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <Input
        label="Name *"
        name="registerName"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Avatar URL *"
        name="registerAvatarUrl"
        placeholder="Avatar"
        value={values.avatarUrl}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
