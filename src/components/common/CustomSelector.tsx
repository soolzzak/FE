import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { genderAtom } from '../../store/addRoomStore';
import { genderSelection } from '../../utils/switchSelections';

export const CustomSelector = ({
  genderSetting,
}: {
  genderSetting?: string;
}) => {
  const selections = ['ANY', 'FEMALE', 'MALE'];
  const displayedSelections = ['누구나', '여자만', '남자만'];

  const [selectedOption, handleOptionClick] = useAtom(genderAtom);

  console.log('젠더세팅', genderSetting);
  console.log('성별', selectedOption);

  useEffect(() => {
    handleOptionClick(genderSetting || selections[0]);
  }, []);
  return (
    <section className="f-col">
      <p className="text-base font-bold mb-2 text-[#454545]">입장 허용</p>
      <div className="f-ic w-full justify-between">
        {selections.map((option, index) => (
          <div
            role="none"
            key={option}
            className={`f-ic border-2 px-7 h-9 border-[#929292] rounded-lg cursor-pointer ${
              selectedOption === option
                ? 'bg-primary-50 text-primary-200 border-primary-200'
                : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {displayedSelections[index]}
          </div>
        ))}
      </div>
    </section>
  );
};
