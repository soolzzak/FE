import confetti from '../../assets/images/confetti-40.gif';
import mugs from '../../assets/images/clinking-beer-mugs-joypixels.gif';

export const Toast = () => (
  <div className="fixed f-jic inset-0 w-full h-full z-30">
    <img src={mugs} alt="" className="absolute" />
    <img src={confetti} alt="" className="absoute w-full h-full" />
  </div>
);
