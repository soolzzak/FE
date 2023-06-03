import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { publicOrPrivateAtom } from '../../store/addRoomStore';

type InputProps = {
  title: string;
  leftRightSelect: Array<boolean>;
};

export const TwoOptionsSelector = ({ title, leftRightSelect }: InputProps) => {
  const [selectedOption, setSelectedOption] = useAtom(publicOrPrivateAtom);

  useEffect(() => {
    setSelectedOption(leftRightSelect[0]);
  }, []);

  return (
    <div className="w-3/4">
      <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>
      <button
        type="button"
        className={`rounded-l-lg h-11 w-16 border-2 
        ${
          selectedOption === leftRightSelect[0]
            ? 'bg-primary-50 text-primary-200 border-primary-200 -mr-[2px]'
            : 'border-r-transparent text-[#ACACAC] border-[#ACACAC]'
        }`}
        onClick={() => setSelectedOption(leftRightSelect[0])}
      >
        공개
      </button>
      <button
        type="button"
        className={`rounded-r-lg h-11 w-16  border-2 
        ${
          selectedOption === leftRightSelect[1]
            ? 'bg-primary-50 text-primary-200 border-primary-200 -ml-[1px]'
            : 'border-l-transparent text-[#ACACAC] border-[#ACACAC] '
        }`}
        onClick={() => setSelectedOption(leftRightSelect[1])}
      >
        비공개
      </button>
    </div>
  );
};
