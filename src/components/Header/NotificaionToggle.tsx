import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../../assets/svgs/Notifications';
import { userAlertAtom } from '../../store/mainpageStore';
import { isOpenJoinRoomAtom } from '../../store/modalStore';

export const NotificaionToggle = () => {
  const [userAlert, setuserAlert] = useAtom(userAlertAtom);
  const [,setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(0);
  const [alertCheck, setAlertCheck] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAlert(userAlert.filter((item) => item.uncheck === true).length);
  }, [userAlert]);

  const onToggle = () => {
    setIsOpen(!isOpen);
    setuserAlert((prevData) =>
    prevData.map((item) => ({
      ...item,
      uncheck: false,
    })))
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
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
    <div ref={dropdownRef}>
      <div className="relative">
        <div
          role="button"
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Notifications />
        </div>
        {showAlert > 0 ? (
          <div className="absolute -top-1 -right-1 rounded-full bg-red-600 w-2 h-2" />
        ) : null}
      </div>

      <div className="relative">
        {isOpen && (
          <div className="absolute bg-[#F4F4F4] rounded-lg w-96 h-80 flex flex-col justify-center top-8 -right-6">
            {userAlert.length === 0 ? (
              <div className="f-jic-col gap-2">
                <Notifications size="60" />
                메세지가 없습니다!
              </div>
            ) : (
              <div className="w-full h-full overflow-hidden rounded-2xl f-ic-col py-3 px-5">
                <div className="w-full h-full overflow-y-auto">
                  {userAlert.map((item) => (
                    <div
                      role="none"
                      key={item.username}
                      className="w-full h-1/3 border border-[#C2C2C2] bg-white cursor-pointer rounded-2xl mb-2 f-jic-col"
                      onClick={() => setIsOpenJoinRoom(true)}
                    >
                      <p className="text-base text-[#252525] font-medium">
                        {item.username}님이 방을 개설했습니다! 😀
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
