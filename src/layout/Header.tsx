import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { HeaderRightSection } from '../components/Header/HeaderRightSection';
import { HeaderLeftSection } from '../components/Header/HeaderLeftSection';
import { AuthModal } from '../components/Header/AuthModal';

export const Header = () => {
  const [isOpen, onClose, setIsOpen] = useModal();

  return (
    <div className="w-full absolute">
      <Modal isOpen={isOpen} onClose={onClose}>
        <AuthModal />
      </Modal>
      <div className="relative f-ic justify-between h-24 shadow-sm">
        <HeaderLeftSection />
        <HeaderRightSection setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
