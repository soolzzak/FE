import React, { useEffect, useState } from 'react';

export const WaitingGuestRef = () => {
  const [time, setTime] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev % 3) + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="f-jic-col text-white xl:text-3xl w-full rounded-2xl h-full min-h-[600px] max-h-[600px] bg-black py-5">
      <div className="flex gap-5 mb-5">
        <div
          className={`w-3 h-3 rounded-full ${
            time === 1 ? 'bg-white' : 'bg-[#969696]'
          }`}
        />
        <div
          className={`w-3 h-3 rounded-full ${
            time === 2 ? 'bg-white' : 'bg-[#969696]'
          }`}
        />
        <div
          className={`w-3 h-3 rounded-full ${
            time === 3 ? 'bg-white' : 'bg-[#969696]'
          }`}
        />
      </div>
      <div className='font-bold'>짝을 기다리고 있어요 👀</div>
    </div>
  );
};
