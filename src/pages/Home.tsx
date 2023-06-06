import { CategoryTab } from '../components/Home/CategoryTab';
import { HeroSection } from '../components/Home/HeroSection';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';

export const Home = () => {
  const [isOpenJoinroom, onCloseJoinRoom, setIsOpenJoinRoom] = useModal();
  const [isOpenWaitingRoom, onCloaseWaitingRoom, setIsOpenWaitingRoom] =
    useModal();

  return (
    <div className="f-ic-col bg-[#F5F5F7] min-h-screen w-full min-w-[660px]">
      <HeroSection />
      <div className="sticky top-[70px] z-10 w-full">
        <CategoryTab />
      </div>
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
