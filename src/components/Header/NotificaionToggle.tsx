import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../../assets/svgs/Notifications';
import {
  userAlertAtom,
  userNicknameAtom,
  userTokenAtom,
  usernameAtom,
} from '../../store/mainpageStore';
import { isOpenJoinRoomAtom } from '../../store/modalStore';

export const NotificaionToggle = () => {
  const [userAlert, setuserAlert] = useAtom(userAlertAtom);
  const [, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(0);
  const [alertCheck, setAlertCheck] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [username] = useAtom(userNicknameAtom);

  const receivedTimeAlert = userAlert.map((item) => {
    const currTime = new Date();
    const receivedTime = new Date(item.time);
    const modiTime = `${
      receivedTime.getMonth() + 1
    }월 ${receivedTime.getDate()}일`;
    const timeDiffer: number = currTime.getTime() - receivedTime.getTime();
    let timeShown: string;
    if (timeDiffer < 60 * 1000) {
      timeShown = '방금 전';
    } else if (timeDiffer < 60 * 60 * 1000) {
      timeShown = `${Math.floor(timeDiffer / (60 * 1000))}분 전`;
    } else if (timeDiffer < 24 * 60 * 60 * 1000) {
      timeShown = `${Math.floor(timeDiffer / (60 * 60 * 1000))}시간 전`;
    } else {
      timeShown = modiTime;
    }
    return timeShown;
  });

  useEffect(() => {
    setShowAlert(userAlert.filter((item) => item.uncheck === true).length);
  }, [userAlert]);

  const onToggle = () => {
    setIsOpen(!isOpen);
    setuserAlert((prevData) =>
      prevData.map((item) => ({
        ...item,
        uncheck: false,
      }))
    );
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
          <div className={`${userAlert.length === 0 ? 'w-[300px] h-[200px]' : 'h-fit' } absolute bg-[#F4F4F4] rounded-lg w-96 max-h-[320px] f-col justify-center top-8 -right-6`}>
            {userAlert.length === 0 ? (
              <div className="f-jic-col gap-2 text-lg font-medium">
                <Notifications size="60" />
                메세지가 없습니다!
              </div>
            ) : (
              <div className="w-full h-full overflow-hidden rounded-2xl f-ic-col pt-5 pb-3 px-5">
                <div className="w-full h-full overflow-y-auto f-col justify-between">
                  {userAlert.map((item) => (
                    <div
                      role="none"
                      key={item.username}
                      className="w-full h-24 border border-[#C2C2C2] bg-white cursor-pointer rounded-2xl mb-2 flex items-center"
                      onClick={() => setIsOpenJoinRoom(true)}
                    >
                      <div className="w-full f-col pl-5">
                        <p className="text-base text-[#252525] font-medium">
                          {username}님, {item.username}님이 방을 개설했습니다!
                        </p>
                        <p>짝꿍과 가볍고 편하게 술 한잔 어때요?😀</p>
                        <p className="text-sm text-[#9E9E9E] font-medium">
                          {receivedTimeAlert[userAlert.indexOf(item)]}
                        </p>
                      </div>
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
