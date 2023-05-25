import { useState } from 'react';

type InputProps = {
  title: string;
  leftText: string;
  rightText: string;
};

export const TwoOptionSelector = ({
  title,
  leftText,
  rightText,
}: InputProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="w-3/4">
      <p className="text-base font-bold mb-2 text-[#454545]">{title}</p>
      <button
        className={`rounded-l-lg h-11 w-16 border border-[#929292]
        ${selectedOption === 'left' ? 'bg-[#454545] text-white' : ''}`}
        onClick={() => setSelectedOption('left')}
      >
        {leftText}
      </button>
      <button
        className={`rounded-r-lg h-11 w-16 -ml-[1px] border border-[#929292] bg-white
        ${selectedOption === 'right' ? 'bg-[#454545] text-white' : ''}`}
        onClick={() => setSelectedOption('right')}
      >
        {rightText}
      </button>
    </div>
  );
};
