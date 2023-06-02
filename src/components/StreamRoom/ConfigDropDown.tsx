import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { KickoutModal } from './KickoutModal';
import { Setting } from '../../assets/svgs/Setting';

export const ConfigDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  // 방 수정하기
  const handleModifyClick = () => {
    setIsOpen(false);
  };

  // 강퇴하기
  const handleKickOutClick = () => {
    setIsOpen(false);
    setIsOpenKickout(true);
  };

  return (
    <div>
      <Modal isOpen={isOpenKickout} onClose={onCloseKickout}>
        <KickoutModal onClose={onCloseKickout} />
      </Modal>
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className="rounded-full bg-[#959595] w-20 h-20 flex justify-center items-center hover:cursor-pointer"
      >
        <Setting />
      </div>

      <div className="relative mt-3 font-semibold">
        {isOpen && (
          <div className="bg-white rounded-lg w-28 h-24 flex flex-col justify-center items-center absolute z-10 bottom-28 ">
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
