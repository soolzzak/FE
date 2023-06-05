type InputProps = {
  title: string;
  placeholderText: string;
  inputType: string;
  autofocus?: boolean;
  disabled?: boolean;
  handleInputChange: (option: string) => void;
};

export const ModalInput = ({
  title,
  placeholderText,
  inputType,
  autofocus = false,
  disabled = false,
  handleInputChange,
}: InputProps) => {
  console.log(title);
  return (
    <div className="w-full">
      <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>
      <input
        key={title}
        type={inputType}
        autoFocus={autofocus}
        disabled={disabled}
        className={`w-full h-11 pl-4 px-3 text-sm rounded-lg border border-[#929292]
        ${disabled ? 'bg-primary-50 text-' : ''}`}
        placeholder={placeholderText}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};
