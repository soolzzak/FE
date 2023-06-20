import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../../assets/svgs/Notifications';
import { useModal } from '../../hooks/useModal';
import { userTokenAtom, usernameAtom } from '../../store/mainpageStore';
import {
  isOpenAuthModalAtom,
  isOpenLoginModalAtom,
} from '../../store/modalStore';
import { CommonButton } from '../common/CommonButton';
import { Modal } from '../common/Modal';
import { LoginModal } from '../login/LoginModal';
import { AddRoom } from './AddRoom';
import { AuthModal } from './AuthModal';
import { ProfileMenu } from './ProfileMenu';
import { handleTitleChangeAtom } from '../../store/addRoomStore';

export const HeaderRightSection = () => {
  const [isOpenAuth, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [isOpenLogin, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const onCloseRoomCreateModal = () => {
    handleTitleChange('');
    onCloseRoomCreate();
  };
  const [user] = useAtom(usernameAtom);
  const [userAtom, setUserAtom] = useAtom(userTokenAtom);
  console.log(userAtom);
  useEffect(() => {
    if (user) {
      setUserAtom(jwtDecode(user));
    }
  }, [user]);
  let eventSource: EventSource;
  // console.log(userAtom);
  useEffect(() => {
    if (user) {
      eventSource = new EventSource(
        `https://api.honsoolzzak.com/events/${userAtom?.auth.id}`
      );
    }
    if (eventSource) {
      eventSource.onmessage = () => {
        // console.log('Received SSE event:', event.data);
      };
      eventSource.onerror = () => {
        // console.error('SSE connection error:', error);
      };
    }
    return () => {
      eventSource.close();
    };
  }, []);
  const navigate = useNavigate();
  return (
    <motion.section
      className={`f-ic justify-end mr-4 md:min-w-[200px]
      ${user ? 'min-w-[490px]' : 'min-w-[180px]'}`}
    >
      <AnimatePresence>
        <Modal
          key={1}
          isOpen={isOpenAuth}
          hasOverlay
          onClose={() => setIsOpenAuth(false)}
        >
          <AuthModal />
        </Modal>
        <Modal
          key={2}
          isOpen={isOpenLogin}
          hasOverlay
          onClose={() => setIsOpenLogin(false)}
        >
          <LoginModal />
        </Modal>
      </AnimatePresence>
      <Modal
        isOpen={isOpenRoomCreate}
        onClose={onCloseRoomCreateModal}
        hasOverlay
      >
        <AddRoom onClose={onCloseRoomCreateModal} />
      </Modal>
      {userAtom && user ? (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="f-jic"
        >
          <CommonButton
            buttonText="혼술짝 방만들기"
            enabled
            clickHandler={() => setIsOpenRoomCreate(true)}
            dimensions="mr-7 min-w-[185px] rounded-lg"
          />
          <Notifications />
          <ProfileMenu user={userAtom.sub} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-w-[250px]"
        >
          <button
            type="button"
            className="text-primary-300 hover:text-primary-400 text-lg mr-7 font-semibold"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
          <CommonButton
            buttonText="로그인"
            enabled
            clickHandler={() => setIsOpenLogin(true)}
            dimensions="mr-7 text-lg min-w-[70px] rounded-lg"
          />
        </motion.div>
      )}
    </motion.section>
  );
};
