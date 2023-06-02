import { Notifications } from '../../assets/svgs/Notifications';
import { useModal } from '../../hooks/useModal';
import { AddRoom } from './AddRoom';
import { CommonButton } from '../common/CommonButton';
import { Modal } from '../common/Modal';
import { AuthModal } from './AuthModal';

export const HeaderRightSection = () => {
  const [isOpenAuth, onCloseAuth, setIsOpenAuth] = useModal();
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [isOpenLogin, onCloseLogin, setIdOpenLogin] = useModal();

  return (
    <section className="f-jic mr-4 min-w-[469px]">
      <Modal isOpen={isOpenAuth} onClose={onCloseAuth}>
        <AuthModal setIdOpenLogin={setIdOpenLogin} />
      </Modal>
      <Modal isOpen={isOpenRoomCreate} onClose={onCloseRoomCreate} hasOverlay>
        <AddRoom onClose={onCloseRoomCreate} />
      </Modal>
      {/* <button
        type="button"
        className="mr-5 text-lg"
        onClick={() => setIsOpenAuth(true)}
      >
        Login
      </button> */}
      <CommonButton
        buttonText="혼술짝 방만들기"
        clickHandler={() => setIsOpenRoomCreate(true)}
        dimensions="mr-7"
      />
      <Notifications />
      {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
      <div className="px-7 text-lg font-semibold">{'Username'}</div>
      <div className="w-12 h-12 rounded-full bg-primary-200 mr-3" />
    </section>
  );
};
