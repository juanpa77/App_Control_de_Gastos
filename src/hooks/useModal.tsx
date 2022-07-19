import { useState } from "react";

export const useModal = (
  initialValue = false
): [boolean, () => void, () => void] => {
  const [isOpenModal, setisOpenModal] = useState(initialValue);

  const openModal = () => setisOpenModal(true);

  const closeModal = () => setisOpenModal(false);

  return [isOpenModal, openModal, closeModal];
};
