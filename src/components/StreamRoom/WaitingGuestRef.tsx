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
    <div className="flex flex-col items-center justify-center w-full h-full object-cover rounded-xl bg-black text-white text-3xl">
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
