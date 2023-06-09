export const Modify = ({ onClick }: { onClick?: () => void }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <circle cx="25" cy="25" r="25" fill="#FFF0DF" />
    <mask
      id="mask0_103_191"
      // style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="13"
      y="13"
      width="24"
      height="24"
    >
      <rect
        x="13"
        y="13"
        width="24"
        height="24"
        fill="
#ffffff"
      />
    </mask>
    <g mask="url(#mask0_103_191)">
      <path
        d="M18 32H19.4L28.025 23.375L26.625 21.975L18 30.6V32ZM32.3 21.925L28.05 17.725L29.45 16.325C29.8333 15.9417 30.3042 15.75 30.8625 15.75C31.4208 15.75 31.8917 15.9417 32.275 16.325L33.675 17.725C34.0583 18.1083 34.2583 18.5708 34.275 19.1125C34.2917 19.6542 34.1083 20.1167 33.725 20.5L32.3 21.925ZM30.85 23.4L20.25 34H16V29.75L26.6 19.15L30.85 23.4Z"
        fill="
        #FF6700"
      />
    </g>
  </svg>
);
