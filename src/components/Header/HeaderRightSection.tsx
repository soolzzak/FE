import { atom, useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { Notifications } from '../../assets/svgs/Notifications';
import { useModal } from '../../hooks/useModal';
import { CommonButton } from '../common/CommonButton';
import { Modal } from '../common/Modal';
import { AddRoom } from './AddRoom';
import { AuthModal } from './AuthModal';
import { LoginModal } from '../login/LoginModal';

const username = Cookies.get('accessKey');
export const usernameAtom = atom(username);

export const HeaderRightSection = () => {
  const [isOpenAuth, onCloseAuth, setIsOpenAuth] = useModal();
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [isOpenLogin, onCloseLogin, setIdOpenLogin] = useModal();
  const [user] = useAtom(usernameAtom);

  return (
    <section className="f-jic mr-4 min-w-[469px]">
      <Modal isOpen={isOpenAuth} hasOverlay onClose={onCloseAuth}>
        <LoginModal />
      </Modal>
      <Modal isOpen={isOpenRoomCreate} onClose={onCloseRoomCreate} hasOverlay>
        <AddRoom onClose={onCloseRoomCreate} />
      </Modal>
      {user ? (
        <>
          <CommonButton
            buttonText="혼술짝 방만들기"
            clickHandler={() => setIsOpenRoomCreate(true)}
            dimensions="mr-7"
          />
          <Notifications />

          <div className="px-7 text-lg font-semibold">{user}</div>
          <div className="w-12 h-12 rounded-full bg-primary-200 mr-3" />
        </>
      ) : (
        <CommonButton
          buttonText="로그인"
          clickHandler={() => setIsOpenAuth(true)}
          dimensions="mr-7"
        />
      )}
    </section>
  );
};
