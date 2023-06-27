import { useAtom } from 'jotai';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import {
  isOpenKickoutModalAtom,
  isOpenModifyRoomAtom,
} from '../../store/modalStore';

export const ConfigDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);
  const [, setIsOpenKickOut] = useAtom(isOpenKickoutModalAtom);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.keyCode !== 229) {
      setIsOpen(!isOpen);
    }
  };

  // 외부클릭시닫기
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

  // 방 수정하기
  const handleModifyClick = () => {
    setModiftRoomIsOpen(true);
    setIsOpen(false);
  };

  // 강퇴하기
  const handleKickOutClick = () => {
    // console.log('바보');
    // event.stopPropagation();

    setIsOpenKickOut(true);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="z-10">
      <div
        role="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="iconStyle bg-[#C0C0C0]"
      >
        <AiOutlineSetting className="text-4xl text-white hover:animate-spin" />
      </div>

      {/* <div className="iconStyle bg-[#727272]">
                  <AiOutlineSetting className="text-5xl text-white hover:animate-spin" />
                </div> */}

      <div className="relative font-semibold">
        {isOpen && (
          <div className="bg-white rounded-lg w-28 h-24 flex flex-col justify-center items-center absolute bottom-[72px] -right-6">
            <div
              className="border-b-2 w-full basis-1/2 flex items-center justify-center relative z-20"
              onClick={handleModifyClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              방 수정하기
            </div>
            <div
              className="w-full basis-1/2 flex items-center justify-center relative z-20"
              onClick={handleKickOutClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              강퇴하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
