import { useState } from 'react';

type ReturnType = [string, (option: string) => void];

export const useCustomSelector = (selection: string): ReturnType => {
  const [selectedOption, setSelectedOption] = useState(selection);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return [selectedOption, handleOptionClick];
};
