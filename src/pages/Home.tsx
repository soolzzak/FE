import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HeroSection } from '../components/Home/HeroSection';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../store/modalStore';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';

export const Home = () => {
  const [isOpenJoinRoom, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom)
  const [isOpenWaitingRoom, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom)
  return (
    <div className="f-ic-col bg-primary-50 min-h-screen w-full min-w-[660px]">
      <HeroSection />
      <CategoryTab />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeBodySection />
      </Suspense>
      <Modal isOpen={isOpenJoinRoom} onClose={() => setIsOpenJoinRoom(false)} hasOverlay>
        <JoinRoomModal />
      </Modal>
      <Modal isOpen={isOpenWaitingRoom} onClose={() => setIsOpenWaitingRoom(false)} hasOverlay>
        <WaitingRoomModal />
      </Modal>
    </div>
  );
};
