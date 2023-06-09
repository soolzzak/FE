import { Dispatch, SetStateAction } from 'react';

export const Monitor = ({
  monitorOff,
  setMonitorOff,
}: {
  monitorOff: boolean;
  setMonitorOff: Dispatch<SetStateAction<boolean>>;
}) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={() => setMonitorOff((prev) => !prev)}
    style={{ cursor: 'pointer' }}
  >
    <circle cx="37.5" cy="37.5" r="37.5" fill={monitorOff? "black" : "#959595"} fillOpacity={monitorOff? "1" : "0.5"} />
    <path
      d="M31 53V49.6667H34.3333V46.3333H24.3333C23.4167 46.3333 22.6319 46.0069 21.9792 45.3542C21.3264 44.7014 21 43.9167 21 43V26.3333C21 25.4167 21.3264 24.6319 21.9792 23.9792C22.6319 23.3264 23.4167 23 24.3333 23H51C51.9167 23 52.7014 23.3264 53.3542 23.9792C54.0069 24.6319 54.3333 25.4167 54.3333 26.3333V43C54.3333 43.9167 54.0069 44.7014 53.3542 45.3542C52.7014 46.0069 51.9167 46.3333 51 46.3333H41V49.6667H44.3333V53H31ZM24.3333 43H51V26.3333H24.3333V43Z"
      fill="white"
    />
  </svg>
);
