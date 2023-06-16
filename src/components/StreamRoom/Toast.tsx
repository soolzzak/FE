import { useAtom } from 'jotai';
import { useEffect } from 'react';
import confetti from '../../assets/images/confetti-40.gif';
import mugs from '../../assets/images/clinking-beer-mugs-joypixels.gif';
import { toastAtom } from '../../store/modalStore';

export const Toast = () => {
  const [showToast] = useAtom(toastAtom);
  useEffect(() => {
    // console.log(showToast);
  }, [showToast]);
  return (
    <div className="fixed f-jic inset-0 w-full h-full z-30">
      <img src={mugs} alt="" className="absolute" />
      <img src={confetti} alt="" className="absoute w-full h-full" />
    </div>
  );
};
