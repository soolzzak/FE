import { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { titleAtom } from '../../store/addRoomStore';

type InputProps = {
  title: string;
  placeholderText: string;
  inputType: string;
  autofocus?: boolean;
  disabled?: boolean;
  constraint?: number;
  inputValue?: boolean;
  handleInputChange: (option: string) => void;
};

export const ModalInput = ({
  title,
  placeholderText,
  inputType,
  autofocus = false,
  disabled = false,
  constraint,
  inputValue,
  handleInputChange,
}: InputProps) => {
  const [inputTitle] = useAtom(titleAtom);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (constraint) {
      if (e.target.value.length <= constraint)
        handleInputChange(e.target.value);
      return;
    }
    handleInputChange(e.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>

        {inputValue && (
          <p
            className={`text-sm font-bold mb-2 text-[#454545] mr-2
          ${inputTitle.length === constraint && 'text-red-600'}`}
          >
            {inputTitle.length}/25
          </p>
        )}
      </div>
      {inputValue ? (
        <input
          key={title}
          type={inputType}
          value={inputTitle}
          autoFocus={autofocus}
          disabled={disabled}
          className={`w-full h-9 pl-4 px-3 border-2 border-[#929292] text-sm rounded-lg 
        ${disabled ? 'bg-primary-50 text-' : ''}`}
          placeholder={placeholderText}
          onChange={onInputChange}
        />
      ) : (
        <input
          key={title}
          type={inputType}
          autoFocus={autofocus}
          disabled={disabled}
          className={`w-full h-9 pl-4 px-3 border-2 border-[#929292] text-sm rounded-lg 
        ${disabled ? 'bg-primary-50 text-' : ''}`}
          placeholder={placeholderText}
          onChange={onInputChange}
        />
      )}
    </div>
  );
};
