export const AlcoholTraditionalLiquor = ({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width ? ((width) * 43).toString() : '43'}
    height={height ? ((height) * 84).toString() : '84'}
    viewBox="0 0 43 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6.78354"
      y="50.2383"
      width="31.1128"
      height="6.6263"
      fill="#B6ECC4"
    />
    <path
      d="M37.3838 57.0664H7.41956L7.41956 78.2141H36.8455L37.3838 57.0664Z"
      fill="#FF8A00"
    />
    <path d="M7.19348 56.8633H36.9906" stroke="#179638" strokeWidth="3" />
    <path d="M7.19348 50.4668H36.9906" stroke="#179638" strokeWidth="3" />
    <path
      d="M18.3683 14.0762C18.3683 14.0762 11.653 39.7697 8.39395 47.3318C5.13487 54.894 7.16611 78.2142 7.16611 78.2142H22.1579"
      stroke="#179638"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.9885 14.0762C25.9885 14.0762 32.7494 39.7697 36.0306 47.3318C39.3118 54.894 37.2667 78.2142 37.2667 78.2142H22.1579"
      stroke="#179638"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.9329 5.54297H17.4133V14.2051H26.9329V5.54297Z"
      fill="#FFF0DF"
      stroke="#179638"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);
