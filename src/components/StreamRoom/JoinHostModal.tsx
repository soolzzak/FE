import { useEffect, useState } from 'react';

export const JoinHostModal = ({ onClose }: { onClose: () => void}) => {
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onClose();
    }

    return () => {
      clearInterval(timer);
    };
  }, [onClose]);

  return (
    <div className="w-[515.68px] h-[327.35px] bg-[#FFFFFF] rounded-[30px] border text-center flex flex-col justify-center">
      <div className='font-bold text-2xl text-[#454545] mb-2'>혼술짝 방이 개설 됐어요!</div>

      <div className='w-[472.23px] h-[90px] bg-[#FAFAFA] rounded-xl flex flex-col justify-center'>
        <p className='font-medium text-lg text-[#454545]'>짝을 기다리고 있어요</p>
      </div>
    </div>
  );
};
