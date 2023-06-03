import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { genderAtom } from '../../store/addRoomStore';

type CustomSelectorProps = {
  selections: Array<string>;
};

export const CustomSelector = ({ selections }: CustomSelectorProps) => {
  const [selectedOption, handleOptionClick] = useAtom(genderAtom);
  useEffect(() => {
    handleOptionClick(selections[0]);
  }, []);
  return (
    <section className="f-col">
      <p className="text-base font-bold mb-2 text-[#454545]">입장 허용</p>
      <div className="f-ic w-full justify-between">
        {selections.map((option) => (
          <div
            role="none"
            key={option}
            className={`border-2 px-7 py-2 border-[#929292] rounded-lg cursor-pointer ${
              selectedOption === option
                ? 'bg-primary-50 text-primary-200 border-primary-200'
                : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </section>
  );
};
