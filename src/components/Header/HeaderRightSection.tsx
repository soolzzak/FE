import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
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

export const HeaderRightSection = () => {
  const [isOpenAuth, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [isOpenLogin, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [user] = useAtom(usernameAtom);
  const [userAtom, setUserAtom] = useAtom(userTokenAtom);

  useEffect(() => {
    if (user) {
      setUserAtom(jwtDecode(user));
    }
  }, [user]);

  return (
    <motion.section
      className={`f-ic justify-end mr-4 md:min-w-[200px]
      ${user ? 'min-w-[490px]' : 'min-w-[180px]'}`}
    >
      <Modal
        isOpen={isOpenAuth}
        hasOverlay
        onClose={() => setIsOpenAuth(false)}
      >
        <AuthModal />
      </Modal>
      <Modal
        isOpen={isOpenLogin}
        hasOverlay
        onClose={() => setIsOpenLogin(false)}
      >
        <LoginModal />
      </Modal>
      <Modal isOpen={isOpenRoomCreate} onClose={onCloseRoomCreate} hasOverlay>
        <AddRoom onClose={onCloseRoomCreate} />
      </Modal>
      {userAtom ? (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="f-jic"
        >
          <CommonButton
            buttonText="혼술짝 방만들기"
            clickHandler={() => setIsOpenRoomCreate(true)}
            dimensions="mr-7 min-w-[185px]"
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
        >
          <CommonButton
            buttonText="로그인"
            clickHandler={() => setIsOpenAuth(true)}
            dimensions="mr-7 min-w-[70px]"
          />
        </motion.div>
      )}
    </motion.section>
  );
};
