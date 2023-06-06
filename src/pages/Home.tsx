import { useAtom } from 'jotai';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HeroSection } from '../components/Home/HeroSection';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../store/modalStore';
import { Modal } from '../components/common/Modal';

export const Home = () => {
  const [isOpenJoinRoom, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [isOpenWaitingRoom, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom);
  return (
    <div className="f-ic-col bg-[#F5F5F7] min-h-screen w-full min-w-[660px]">
      <HeroSection />
      <div className="sticky top-[70px] z-10 w-full">
        <CategoryTab />
      </div>
      <HomeBodySection />
      <Modal
        isOpen={isOpenJoinRoom}
        onClose={() => setIsOpenJoinRoom(false)}
        hasOverlay
      >
        <JoinRoomModal />
      </Modal>
      <Modal
        isOpen={isOpenWaitingRoom}
        onClose={() => setIsOpenWaitingRoom(false)}
        hasOverlay
      >
        <WaitingRoomModal />
      </Modal>
    </div>
  );
};
