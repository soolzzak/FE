type ButtonProps = {
  buttonText: string;
  clickHandler: () => void;
  textSize?: string;
  dimensions?: string;
};
export const CommonButton = ({
  buttonText,
  clickHandler,
  textSize,
  dimensions,
}: ButtonProps) => (
  <button
    type="button"
    onClick={clickHandler}
    className={`cursor-pointer 
      text-${textSize} ${dimensions} text-white font-bold 
      bg-primary-300 py-2.5 px-3.5 lg:px-10 rounded-lg shadow  
      hover:bg-primary-200 transition duration-300 `}
  >
    {buttonText}
  </button>
);
