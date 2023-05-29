import { useState } from 'react';

type ReturnType<T> = [T, (option: T) => void];

export const useCustomSelector = <T>(selection: T): ReturnType<T> => {
  const [selectedOption, setSelectedOption] = useState<T>(selection);

  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
  };

  return [selectedOption, handleOptionClick];
};
