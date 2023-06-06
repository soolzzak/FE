import { SetStateAction } from 'jotai';
import Cookies from 'js-cookie';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthToken = {
  sub: string;
};

export const ProfileMenu = ({
  user,
  setUserInfo,
}: {
  user: string;
  setUserInfo: Dispatch<SetStateAction<AuthToken | undefined>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
      <div
        role="none"
        onClick={handleDropdownToggle}
        className="cursor-pointer w-12 h-12 rounded-full bg-primary-100 mr-3 ml-5"
      />
      {isOpen && (
        <div className="absolute border top-full right-3 z-10 mt-1  bg-white rounded-lg shadow-lg">
          <div className="rounded-t-md px-4 py-1  border-b border-green-200  text-black ">
            <div>Signed in as</div>
            <div className="font-bold text-sm">{user}</div>
          </div>
          <div
            role="none"
            onClick={() => navigate('/mypage')}
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
        </div>
      )}
    </div>
  );
};
