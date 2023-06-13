import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMypageProfile } from '../../api/mypage';
import { userTokenAtom } from '../../store/mainpageStore';

export const ProfileMenu = ({ user }: { user: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery('profile', getMypageProfile, {
    refetchOnWindowFocus: false,
  });
  const [, setUserInfo] = useAtom(userTokenAtom);
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

  return (
    <div className="relative" ref={dropdownRef}>
      {data?.data.userImage ? (
        <img
          alt="Profile pic"
          src={data.data.userImage}
          role="none"
          onClick={handleDropdownToggle}
          className="cursor-pointer min-w-[48px] w-12 h-12 rounded-full bg-primary-100 mr-3 ml-5"
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
          className="absolute border top-full right-3 z-10 mt-1 bg-white rounded-lg shadow-lg"
        >
          <div className="rounded-t-md px-4 py-1 text-lg border-b border-green-200 text-black ">
            <div>Signed in as</div>
            <div className="font-bold text-lg">{user}</div>
          </div>
          <div
            role="none"
            onClick={() => {
              setIsOpen(false);
              navigate('/mypage');
            }}
            className="dropdownItemStyle"
          >
            <div>Mypage</div>
          </div>
          <div
            role="none"
            onClick={handleLogout}
            className="  rounded-b-md border-t border-green-200 dropdownItemStyle"
          >
            <div>Logout</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
