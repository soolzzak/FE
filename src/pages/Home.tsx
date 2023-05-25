import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { AddRoom } from '../components/Home/AddRoom';

export const Home = () => {
  const [isOpen, onClose, setIsOpen] = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <AddRoom />
      </Modal>
      <div className="flex items-center flex-col bg-[#F2F2F2;] h-screen w-full">
        <HeroSection />
        <CategoryTab />
        <HomeBodySection />
        <button
          className="h-24 w-full max-w-[1111px] bg-[#9A9A9A;] rounded-3xl font-bold text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          혼술짝 방만들기
        </button>
      </div>
    </>
  );
};
