export const Like = ({
  onClick,
  isActive,
}: {
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <svg
    width="47"
    height="47"
    viewBox="0 0 47 47"
    // fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <circle
      cx="23.2917"
      cy="23.2917"
      r="23.2917"
      fill={isActive ? '#E5F9EA' : '#F4F4F4'}
    />
    <mask
      id="mask0_65_253"
      // style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="11"
      y="11"
      width="24"
      height="24"
    >
      <rect x="11" y="11" width="24" height="24" fill="#ffffff" />
    </mask>
    <g mask="url(#mask0_65_253)">
      <path
        d="M29 32H18V19L25 12L26.25 13.25C26.3667 13.3667 26.4625 13.525 26.5375 13.725C26.6125 13.925 26.65 14.1167 26.65 14.3V14.65L25.55 19H32C32.5333 19 33 19.2 33.4 19.6C33.8 20 34 20.4667 34 21V23C34 23.1167 33.9833 23.2417 33.95 23.375C33.9167 23.5083 33.8833 23.6333 33.85 23.75L30.85 30.8C30.7 31.1333 30.45 31.4167 30.1 31.65C29.75 31.8833 29.3833 32 29 32ZM20 30H29L32 23V21H23L24.35 15.5L20 19.85V30ZM18 19V21H15V30H18V32H13V19H18Z"
        fill={isActive ? '#078728' : '#323232'}
      />
    </g>
  </svg>
);
