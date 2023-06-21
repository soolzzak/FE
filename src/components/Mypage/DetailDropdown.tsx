import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { BlockModal } from '../StreamRoom/BlockModal';
import { Menu } from '../../assets/svgs/Menu';
import { ReportModal } from '../../report/ReportModal';
import { DetailUserProfile } from '../../api/mypage';

export const DetailDropdown = ({
  userinfo,
}: {
  userinfo: DetailUserProfile | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpenBlock, onCloseBlock, setIsOpenBlock] = useModal();
  const [isOpenReport, onCloseReport, setIsOpenReport] = useModal();

  const onToggle = () => {
    setIsOpen(!isOpen);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  // 차단
  const handleBlockClick = () => {
    setIsOpen(false);
    setIsOpenBlock(true);
  };

  // 신고
  const handleReportClick = () => {
    setIsOpen(false);
    setIsOpenReport(true);
  };

  return (
    <div ref={dropdownRef}>
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Profile picture"
      >
        <Menu />
      </div>

      <Modal isOpen={isOpenBlock} onClose={onCloseBlock} hasOverlay>
        {userinfo && <BlockModal userinfo={userinfo} onClose={onCloseBlock} />}
      </Modal>

      <Modal isOpen={isOpenReport} onClose={onCloseReport} hasOverlay>
        {userinfo && (
          <ReportModal userinfo={userinfo} onCloseReport={onCloseReport} />
        )}
      </Modal>

      <div className="relative font-semibold">
        {isOpen && (
          <div className="bg-white rounded-lg w-[113px] h-[114px] flex flex-col justify-center items-center absolute z-10 right-0 top-0 border  ">
            <div
              className="border-b-2 w-full basis-1/3 flex items-center justify-center relative z-20 text-[#000000]"
              onClick={handleReportClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              쪽지보내기
            </div>
            <div
              className="border-b-2 w-full basis-1/3 flex items-center justify-center relative z-20 text-[#F82D2D]"
              onClick={handleBlockClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {userinfo?.block ? '차단해제' : '차단하기'}
            </div>
            <div
              className=" basis-1/3 flex items-center justify-center relative z-20 text-[#F82D2D]"
              onClick={handleReportClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              신고하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
