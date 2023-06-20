import React from 'react';

export const AlcoholWine = ({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width ? ((width) * 76).toString() : '76'}
    height={height ? ((height) * 97).toString() : '97'}
    viewBox="0 0 76 97"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.347 36.1172H25.4042L25.4025 36.134C24.6896 43.5006 23.4558 56.25 38.4101 57.1401C52.6778 57.9894 51.416 42.7685 50.347 36.1172Z"
      fill="#9D063D"
    />
    <path
      d="M25.1276 17.9297V47.6874C25.1276 52.8279 30.9785 56.9974 38.1994 56.9974C45.4204 56.9974 51.2713 52.8279 51.2713 47.6874V17.9297H25.1276Z"
      stroke="#179638"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
    <path
      d="M38.1995 56.9688V75.1889C38.1995 75.1889 31.7777 75.3888 30.2365 79.0729H45.9056C45.9056 79.0729 43.451 75.1889 38.228 75.1889"
      stroke="#179638"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);
