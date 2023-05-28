import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { AddRoom } from '../components/Home/AddRoom';
import { CommonButton } from '../components/common/CommonButton';

export const Home = () => {
  const [isOpen, onClose, setIsOpen] = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <AddRoom isOpen={isOpen} />
      </Modal>
      <div className="f-ic-col bg-[#F2F2F2;] min-h-screen w-full">
        <HeroSection />
        <CategoryTab />
        <HomeBodySection />
        <CommonButton
          buttonText="혼술짝 방만들기"
          clickHandler={() => setIsOpen(true)}
          textSize="2xl"
          dimensions="h-20 w-full"
        />
      </div>
    </>
  );
};
