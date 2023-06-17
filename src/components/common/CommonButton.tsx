type ButtonProps = {
  buttonText: string;
  clickHandler: () => void;
  enabled?: boolean;
  textSize?: string;
  dimensions?: string;
};
export const CommonButton = ({
  buttonText,
  clickHandler,
  enabled,
  textSize,
  dimensions,
}: ButtonProps) => (
  <button
    type="button"
    onClick={clickHandler}
    disabled={!enabled}
    className={`cursor-pointer 
      text-${textSize} ${dimensions} text-white font-bold 
      py-2.5 px-3.5 lg:px-10 rounded-lg shadow  
      ${
        enabled ? 'bg-primary-300 hover:bg-primary-400' : 'bg-gray-300'
      } transition duration-300 `}
  >
    {buttonText}
  </button>
);
