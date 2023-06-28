import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { Logo } from '../../assets/svgs/Logo';
import { isOpenLeaveRoomAtom } from '../../store/modalStore';
import { SearchField } from './SearchField';

export const HeaderLeftSection = () => {
  const location = useLocation();
  const [, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const redirectToRoot = () => {
    if (location.pathname.startsWith('/room')) {
      setIsOpenLeaveRoom(true);
      return;
    }
    window.location.href = '/';
  };

  return (
    <section className="f-ic max-w-[600px]">
      <div role="none" onClick={redirectToRoot} className="cursor-pointer">
        <Logo />
      </div>
      <SearchField />
    </section>
  );
};
