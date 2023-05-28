type ButtonProps = {
  buttonText: string;
  clickHandler: () => void;
  textSize: string;
  dimensions: string;
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
      bg-[#a9a9a9] py-2.5 px-3.5 rounded-md shadow  
      hover:bg-[#c2c2c2] transition duration-300`}
  >
    {buttonText}
  </button>
);
