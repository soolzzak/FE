import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { BlockModal } from './BlockModal';

export const CategoryDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenBlock, onCloseBlock, setIsOpenBlock] = useModal();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  // 팔로우
  const handleFollowClick = () => {
    setIsOpen(false);
  };

  // 차단
  const handleBlockClick = () => {
    setIsOpen(false);
    setIsOpenBlock(true);
  };

  // 신고
  const handleReportClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Profile picture"
        className="w-16 h-16 rounded-full bg-[#9A9A9A] mr-4"
      >
        <img alt='userProfile' className='w-16 m-w-[64px] h-16 rounded-full'/>
      </div>

      <Modal isOpen={isOpenBlock} onClose={onCloseBlock} hasOverlay>
        <BlockModal onClose={onCloseBlock} />
      </Modal>
      <div className="relative mt-3 font-semibold">
        {isOpen && (
          <div className="bg-white rounded-lg w-20 h-28 flex flex-col justify-center items-center absolute z-10">
            <div
              className="border-b-2 w-full basis-1/3  flex items-center justify-center relative z-20"
              onClick={handleFollowClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              팔로우
            </div>
            <div
              className="border-b-2 w-full basis-1/3 flex items-center justify-center relative z-20"
              onClick={handleBlockClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              차단
            </div>
            <div
              className=" basis-1/3 flex items-center justify-center relative z-20"
              onClick={handleReportClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              신고
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
