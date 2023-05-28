type CustomSelectorProps = {
  selections: Array<string>;
  selectedOption: string;
  handleOptionClick: (option: string) => void;
};

export const CustomSelector = ({
  selections,
  selectedOption,
  handleOptionClick,
}: CustomSelectorProps) => (
  <section className="f-col">
    <p className="text-base font-bold mb-2 text-[#454545]">입장 허용</p>
    <div className="f-ic w-full justify-between">
      {selections.map((option) => (
        <div
          role="none"
          key={option}
          className={`border px-7 py-2 border-[#929292] rounded-lg cursor-pointer ${
            selectedOption === option ? 'bg-[#454545] text-white' : ''
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  </section>
);
