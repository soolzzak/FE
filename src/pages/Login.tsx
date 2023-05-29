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

      <button className="mt-32"
      onClick={() => setIsOpen(true)}>로그인 임시버튼</button>
    </div>
  )
};