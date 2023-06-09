import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { userInfo } from '../../api/auth';
import { useModal } from '../../hooks/useModal';
import { handleTitleChangeAtom, isLoginAtom } from '../../store/addRoomStore';
import { userTokenAtom, usernameAtom } from '../../store/mainpageStore';
import {
  isOpenAuthModalAtom,
  isOpenLoginModalAtom,
  isOpenSearchUsernameModalAtom,
} from '../../store/modalStore';
import { CommonButton } from '../common/CommonButton';
import { Modal } from '../common/Modal';
import { LoginModal } from '../login/LoginModal';
import { AddRoom } from './AddRoom';
import { AuthModal } from './AuthModal';
import { ProfileMenu } from './ProfileMenu';
import { SearchUserField } from './SearchUserField';
import { UserAlert } from './UserAlert';

export const HeaderRightSection = () => {
  const [isOpenAuth, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [isOpenLogin, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const onCloseRoomCreateModal = () => {
    handleTitleChange('');
    onCloseRoomCreate();
  };
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const [searchUsernameModalIsOpen, setSearchUsernameModalIsOpen] = useAtom(
    isOpenSearchUsernameModalAtom
  );

  const [user] = useAtom(usernameAtom);
  const [userAtom] = useAtom(userTokenAtom);

  return (
    <motion.section
      className={`f-ic justify-end sm:mr-4 md:min-w-[200px]
      ${user ? 'min-w-[350px]' : 'min-w-[180px]'}`}
    >
      <Modal
        isOpen={searchUsernameModalIsOpen}
        onClose={() => setSearchUsernameModalIsOpen(false)}
        hasOverlay
      >
        <SearchUserField />
      </Modal>

      <AnimatePresence>
        <Modal
          key={1}
          isOpen={isOpenAuth}
          hasOverlay
          onClose={() => setIsOpenAuth(false)}
        >
          <AuthModal login={isLogin} />
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
          <button
            type="button"
            className="text-primary-300 hover:text-primary-400 text-lg mr-7 font-semibold min-w-[70px]"
            onClick={() => setSearchUsernameModalIsOpen(true)}
          >
            유저 찾기
          </button>
          <CommonButton
            buttonText="혼술짝 방만들기"
            enabled
            clickHandler={() => setIsOpenRoomCreate(true)}
            dimensions="mr-7 min-w-[185px] rounded-lg"
          />
          {/* <Notifications /> */}
          <UserAlert />
          <ProfileMenu />
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-row-reverse min-w-[250px]"
        >
          <CommonButton
            buttonText="로그인"
            enabled
            clickHandler={() => setIsOpenLogin(true)}
            dimensions="mr-7 text-lg min-w-[70px] rounded-lg"
          />
          <button
            type="button"
            className="text-primary-300 hover:text-primary-400 text-lg mr-7  font-semibold"
            onClick={() => {
              setIsLogin(() => false);
              setIsOpenAuth(() => true);
            }}
          >
            회원가입
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};
