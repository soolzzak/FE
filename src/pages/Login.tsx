import { Modal } from "../components/common/Modal";
import { LoginModal } from "../components/login/LoginModal";
import { useModal } from "../hooks/useModal";

export const Login = () => {
  const [isOpen, onClose, setIsOpen] = useModal();

  return (
    <div className='flex flex-col items-center'>
      <Modal isOpen={isOpen} onClose={onClose}>
        <LoginModal />
      </Modal>
    </div>
  )
};

// 삭제 필요