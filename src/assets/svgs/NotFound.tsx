import { useEffect, useState } from 'react';

export const NotFoundIcon = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);

    if (time === 100) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
      <svg
        width="47"
        height="89"
        viewBox="0 0 47 89"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <linearGradient id="verticalGradient" gradientTransform="rotate(90)">
          <stop offset={`${time}%`} stopColor="#f6fff9" />
          <stop offset={`${time}%`} stopColor="#179638" />
        </linearGradient>
        <path
          d="M9.42822 12.9277V42.6854C9.42822 47.8259 15.2792 51.9954 22.5001 51.9954C29.721 51.9954 35.572 47.8259 35.572 42.6854V12.9277H9.42822Z"
          stroke="#179638"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinejoin="round"
          fill="url(#verticalGradient)"
        />
        <path
          d="M22.5001 51.9668V70.187C22.5001 70.187 16.0783 70.3869 14.5371 74.0709H30.2062C30.2062 74.0709 27.7517 70.187 22.5287 70.187"
          stroke="#179638"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
      </svg>
  );
};
