type CustomSelectorProps = {
  selections: Array<string>;
  selectedOption: string;
  handleOptionClick: (option: string) => void;
};

export const CustomSelector = ({
  selections,
  selectedOption,
  handleOptionClick,
}: CustomSelectorProps) => {
  return (
    <div className="flex items-center space-x-4">
      {selections.map((option) => (
        <div
          key={option}
          className={`cursor-pointer ${
            selectedOption === option ? 'font-bold' : ''
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};
