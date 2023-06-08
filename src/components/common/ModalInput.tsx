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
}: InputProps) => (
    <div className="w-full">
      <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>
      <input
        key={title}
        type={inputType}
        autoFocus={autofocus}
        disabled={disabled}
        className={`w-full h-9 pl-4 px-3 border-2 border-[#929292] text-sm rounded-lg 
        ${disabled ? 'bg-primary-50 text-' : ''}`}
        placeholder={placeholderText}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
