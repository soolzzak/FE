export const UnLike = ({
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
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{cursor: "pointer"}}
  >
    <circle
      cx="23.2917"
      cy="23.2917"
      r="23.2917"
      fill={isActive ? '#E5F9EA' : '#F4F4F4'}
    />
    <path
      d="M18 15H29V28L22 35L20.75 33.75C20.6333 33.6333 20.5375 33.475 20.4625 33.275C20.3875 33.075 20.35 32.8833 20.35 32.7V32.35L21.45 28H15C14.4667 28 14 27.8 13.6 27.4C13.2 27 13 26.5333 13 26V24C13 23.8833 13.0167 23.7583 13.05 23.625C13.0833 23.4917 13.1167 23.3667 13.15 23.25L16.15 16.2C16.3 15.8667 16.55 15.5833 16.9 15.35C17.25 15.1167 17.6167 15 18 15ZM27 17H18L15 24V26H24L22.65 31.5L27 27.15V17ZM29 28V26H32V17H29V15H34V28H29Z"
      fill={isActive ? '#078728' : '#323232'}
    />
  </svg>
);
