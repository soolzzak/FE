type InputType = {
  placeholderText: string;
  inputType: string;
  inputValue: string | undefined;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  maxLength: number
};

export const SignupInputForm = ({
  placeholderText,
  inputType,
  inputValue,
  handleInputChange,
  handleValidation,
  className,
  maxLength,
}: InputType) => (
  <div>
    {/* <p className="font-bold text-lg mb-2">{title}</p> */}
    <input
      type={inputType}
      value={inputValue}
      className={className}
      placeholder={placeholderText}
      onChange={handleInputChange}
      onBlur={handleValidation}
      maxLength={maxLength}
    />
  </div>
);
