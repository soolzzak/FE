import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMypageProfile } from '../../api/mypage';
import { userNicknameAtom, userTokenAtom } from '../../store/mainpageStore';
import { Modal } from '../common/Modal';
import { MessageModal } from '../Mypage/MessageModal';
import { isOpenMessageModalAtom } from '../../store/modalStore';
import { currentTabAtom, messageUserInfoAtom, tabStateAtom } from '../../store/messageStore';

export const ProfileMenu = ({ user }: { user: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery('profile', getMypageProfile, {
    refetchOnWindowFocus: false,
  });
  const [, setUserInfo] = useAtom(userTokenAtom);
  const [userNickname, setUserNickname] = useAtom(userNicknameAtom);
  const [isOpenMessageModal, setIsOpenMessageModal] = useAtom(
    isOpenMessageModalAtom
  );
  const [,setMessageUserInfo] = useAtom(messageUserInfoAtom)
  const [, setCurrentTab] = useAtom(currentTabAtom);
  const [, setTabState] = useAtom(tabStateAtom);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    setUserInfo(undefined);
    Cookies.remove('refreshKey');
    Cookies.remove('accessKey');
    setIsOpen(false);
    navigate('/');
  };
  const messageHandler = () => {
    setTabState('tab');
    setCurrentTab('받은쪽지함');
    setMessageUserInfo(undefined)
    setIsOpenMessageModal(true);
  }
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setUserNickname(data?.data.username as string);
    }
  }, [data]);

  return (
    <div className="relative" ref={dropdownRef}>
      {data?.data.userImage ? (
        <img
          alt="Profile pic"
          src={data.data.userImage}
          role="none"
          onClick={handleDropdownToggle}
          className="cursor-pointer min-w-[48px] w-12 h-12 rounded-full bg-primary-100 mr-3 ml-5 object-cover"
        />
      ) : (
        <div
          role="none"
          onClick={handleDropdownToggle}
          className="cursor-pointer w-12 h-12 rounded-full bg-primary-100 mr-3 ml-5"
        />
      )}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: -100, x: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0, y: -100, x: 100 }}
          transition={{ duration: 0.15 }}
          className="absolute f-jic-col border top-full right-3 z-10 mt-1 bg-white rounded-lg shadow-lg"
        >
          <div className="rounded-t-md w-full px-4 pr-8 py-2.5 text-lg border-b border-green-200 text-black whitespace-nowrap">
            <div>안녕하세요,</div>
            <span className="font-bold text-lg">{`${data?.data.username}님`}</span>
          </div>
          <div
            role="none"
            onClick={() => {
              setIsOpen(false);
              navigate('/mypage');
            }}
            className="dropdownItemStyle w-full"
          >
            <div>마이페이지</div>
          </div>
          <div
            role="none"
            onClick={messageHandler}
            className="dropdownItemStyle w-full rounded-b-md border-t border-green-200"
          >
            <div>메세지</div>
          </div>
          <div
            role="none"
            onClick={handleLogout}
            className="dropdownItemStyle w-full rounded-b-md border-t border-green-200"
          >
            <div>로그아웃</div>
          </div>
        </motion.div>
      )}
      <Modal
        isOpen={isOpenMessageModal}
        onClose={() => setIsOpenMessageModal(false)}
        hasOverlay
      >
        <MessageModal />
      </Modal>
    </div>
  );
};
