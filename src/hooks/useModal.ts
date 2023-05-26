import { Dispatch, SetStateAction, useState } from 'react';

type ReturnType = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

export const useModal = (): ReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  return [isOpen, onClose, setIsOpen];
};
