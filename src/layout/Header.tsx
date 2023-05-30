import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { HeaderRightSection } from '../components/Header/HeaderRightSection';
import { HeaderLeftSection } from '../components/Header/HeaderLeftSection';
import { AuthModal } from '../components/Header/AuthModal';
import { LoginModal } from '../components/login/LoginModal';

export const Header = () => {
  const [isOpen, onClose, setIsOpen] = useModal();
  const [loginOpen, loginClose, setLoginOpen] = useModal();

  return (
    <div className="w-full absolute">
      <Modal isOpen={isOpen} onClose={onClose}>
        <AuthModal setLoginOpen={setLoginOpen} setIsOpen={setIsOpen} />
      </Modal>

      <Modal isOpen={loginOpen} onClose={loginClose}>
        <LoginModal />
      </Modal>
      <div className="relative f-ic justify-between h-24 shadow-sm">
        <HeaderLeftSection />
        <HeaderRightSection setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
