import { Dispatch, SetStateAction } from 'react';

interface SelectorProps {
  title: string;
  selections: any[];
  displayedSelections: string[];
  selectedOption: any;
  handleOptionClick: Dispatch<SetStateAction<any>>;
}
export const HorizontalSelector = ({
  title,
  selections,
  displayedSelections,
  selectedOption,
  handleOptionClick,
}: SelectorProps) => {
  const onOptionSelect = (option: string | boolean) => {
    handleOptionClick(option);
  };
  return (
    <section className="f-col mt-3">
      <p className="text-lg font-bold mb-2 text-[#454545]">{title}</p>
      <div className="f-ic w-full justify-between gap-3">
        {selections.map((option, index) => (
          <div
            role="none"
            key={option}
            className={`text-sm text-center w-full border-2 px-3 py-1 border-[#929292] rounded-lg cursor-pointer ${
              selectedOption === option
                ? 'bg-primary-50 text-primary-200 border-primary-200'
                : ''
            }`}
            onClick={() => {
              onOptionSelect(option);
              window.scrollTo({
                top: 410,
                behavior: 'smooth',
              });
            }}
          >
            {displayedSelections[index]}
          </div>
        ))}
      </div>
    </section>
  );
};
