import { useState } from 'react';

type InputProps = {
  title: string;
  placeholderText: string;
  inputType: string;
  autofocus?: boolean;
};

export const ModalInput = ({
  title,
  placeholderText,
  inputType,
  autofocus = false,
}: InputProps) => {
  const [modalInputValue, setModalInputValue] = useState('');

  return (
    <div className="w-full">
      <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>
      <input
        key={title}
        type={inputType}
        autoFocus={autofocus}
        value={modalInputValue}
        className="w-full h-11 pl-4 px-3 text-sm rounded-lg border border-[#929292]"
        placeholder={placeholderText}
        onChange={(e) => setModalInputValue(e.target.value)}
      />
    </div>
  );
};
