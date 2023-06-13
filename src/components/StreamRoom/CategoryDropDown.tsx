import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { DetailUserProfile } from '../../api/mypage';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { BlockModal } from './BlockModal';
import { ReportModal } from '../../report/ReportModal';

export const CategoryDropDown = ({
  guestProfile,
}: {
  guestProfile: DetailUserProfile;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const [isOpenBlock, onCloseBlock, setIsOpenBlock] = useModal();
  const [isOpenReport, onCloseReport, setIsOpenReport] = useModal();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  // 팔로우
  // const handleFollowClick = async () => {
  //   const response = await FollowHandler(userinfo?.userId);
  //   toast.success(response?.message);
  //   if (response.status === 200) {
  //     await queryClient.invalidateQueries('mypageInfo');
  //     await queryClient.invalidateQueries('detailUserInfo');
  //   }
  // };

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
    <div className='f-jic'>
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Profile picture"
        className='f-jic'
      >
        <img
          alt="guestImg"
          src={guestProfile?.userImage}
          className="f-jic object-cover w-16 h-16 min-w-[64px] rounded-full mr-4"
        />
      </div>

      <Modal isOpen={isOpenBlock} onClose={onCloseBlock} hasOverlay>
        <BlockModal userinfo={guestProfile} onClose={onCloseBlock} />
      </Modal>

      <Modal isOpen={isOpenReport} onClose={onCloseReport} hasOverlay>
        <ReportModal userinfo={guestProfile} onCloseReport={onCloseReport} />
      </Modal>

      <div className="relative mt-3 font-semibold">
        {isOpen && (
          <div className="bg-white rounded-lg w-[135px] h-[117px] border flex flex-col justify-center items-center absolute z-10">
            <div
              className="border-b-2 w-full basis-1/3  flex items-center justify-center relative z-20"
              // onClick={handleFollowClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              팔로우하기
            </div>
            <div
              className="border-b-2 w-full basis-1/3 flex items-center justify-center relative z-20 text-[#F81C1C]"
              onClick={handleBlockClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              차단하기
            </div>
            <div
              className=" basis-1/3 flex items-center justify-center relative z-20 text-[#F81C1C]"
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
