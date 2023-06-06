import { useAtom } from 'jotai';
import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { Modal } from '../components/common/Modal';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../store/modalStore';

export const Home = () => {
  const [isOpenJoinRoom, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom)
  const [isOpenWaitingRoom, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom)
  return (
    <div className="f-ic-col bg-primary-100 min-h-screen w-full">
      <HeroSection />
      <CategoryTab />
      <HomeBodySection />
      <Modal isOpen={isOpenJoinRoom} onClose={() => setIsOpenJoinRoom(false)} hasOverlay>
        <JoinRoomModal />
      </Modal>
      <Modal isOpen={isOpenWaitingRoom} onClose={() => setIsOpenWaitingRoom(false)} hasOverlay>
        <WaitingRoomModal />
      </Modal>
    </div>
  );
};
