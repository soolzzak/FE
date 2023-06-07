import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HeroSection } from '../components/Home/HeroSection';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { JoinRoomModal } from '../components/Home/JoinRoomModal';
import { WaitingRoomModal } from '../components/Home/WaitingRoomModal';
import { Modal } from '../components/common/Modal';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../store/modalStore';

export const Home = () => {
  const [isOpenJoinRoom, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [isOpenWaitingRoom, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
      className="grad f-ic-col bg-[#f5f7f6] min-h-screen w-full min-w-[660px]"
    >
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
    </motion.div>
  );
};
