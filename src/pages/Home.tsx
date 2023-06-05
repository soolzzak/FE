import { Suspense } from 'react';
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
    <div className="f-ic-col bg-primary-50 min-h-screen w-full min-w-[660px]">
      <HeroSection />
      <CategoryTab />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeBodySection />
      </Suspense>
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
