import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { Modal } from '../components/common/Modal';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { useModal } from '../hooks/useModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { LoginModal } from '../components/login/LoginModal';

export const Home = () => {
  const [isOpenJoinroom, onCloseJoinRoom, setIsOpenJoinRoom] = useModal();
  const [isOpenWaitingRoom, onCloaseWaitingRoom, setIsOpenWaitingRoom] =
    useModal();
  const [isOpenLogin, onCloseLogin, setIsOpenLogin] = useModal();

  return (
    <div className="f-ic-col bg-primary-100 min-h-screen w-full">
      <HeroSection />
      <CategoryTab />
      <HomeBodySection />
      <Modal isOpen={isOpenJoinroom} onClose={onCloseJoinRoom}>
        <JoinRoomModal
          onCloseJoinRoom={onCloseJoinRoom}
          setIsOpenJoinRoom={setIsOpenJoinRoom}
          setIsOpenWaitingRoom={setIsOpenWaitingRoom}
        />
      </Modal>
      <Modal isOpen={isOpenWaitingRoom} onClose={onCloaseWaitingRoom}>
        <WaitingRoomModal onCloaseWaitingRoom={onCloaseWaitingRoom} />
      </Modal>
    </div>
  );
};
