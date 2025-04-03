import ModalWithForm from "./ModalWithForm";
import Input from "./Input";

import { useContext, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  onCloseModal,
  activeModal,
  isLoading,
  editProfileModalName,
  handleEditProfile,
}) => {
  const { values, setValues, handleChange } = useForm({
    name: "",
    avatarUrl: "",
  });

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setValues(() => ({
        name: currentUser.name || "",
        avatarUrl: currentUser.avatar || "",
      }));
    }
  }, [isOpen, setValues, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl } = values;
    handleEditProfile({ name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      name={editProfileModalName}
      title="Change profile data"
      buttonText={isLoading ? "Updating profile..." : "Save Changes"}
      handleCloseModal={onCloseModal}
      activeModal={activeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <Input
        label="Name *"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Avatar URL *"
        name="avatarUrl"
        placeholder="Avatar"
        value={values.avatarUrl}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};
export default EditProfileModal;
