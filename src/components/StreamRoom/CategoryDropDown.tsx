import React, { useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import { DetailUserProfile, FollowHandler } from '../../api/mypage';
import { useModal } from '../../hooks/useModal';
import { ReportModal } from '../../report/ReportModal';
import { Modal } from '../common/Modal';

import { RoomFollowModal } from './RoomFollowModal';

export interface ApiResponse1 {
  status: number;
  msg: string;
  data: DetailUserProfile;
}

export const CategoryDropDown = ({
  guestProfile,
  guestProfileMutation,
}: {
  guestProfile: DetailUserProfile;
  guestProfileMutation: UseMutationResult<
    ApiResponse1 | undefined,
    unknown,
    string,
    unknown
  >;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [isOpenReport, onCloseReport, setIsOpenReport] = useModal();
  const [isOpenRoomFollow, onCloseRoomFollow, setIsOpenRoomFollow] = useModal();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  // 팔로우
  const handleFollowClick = async () => {
    const response = await FollowHandler(guestProfile?.userId);
    setIsOpen(false);
    setIsOpenRoomFollow(true);
    // toast.success(response?.message);
    if (response.status === 200) {
      await queryClient.invalidateQueries('mypageInfo');

      await queryClient.invalidateQueries('detailUserInfo');
      guestProfileMutation.mutate(guestProfile?.userId);
    }
  };

  // 신고
  const handleReportClick = () => {
    setIsOpen(false);
    setIsOpenReport(true);
  };

  return (
    <div className="f-jic">
      <div
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Profile picture"
        className="f-jic"
      >
        <img
          alt="guestImg"
          src={guestProfile?.userImage}
          className="f-jic object-cover w-16 h-16 min-w-[64px] rounded-full mr-4"
        />
      </div>

      <Modal isOpen={isOpenReport} onClose={onCloseReport} hasOverlay>
        <ReportModal userinfo={guestProfile} onCloseReport={onCloseReport} />
      </Modal>

      <Modal isOpen={isOpenRoomFollow} onClose={onCloseRoomFollow}>
        <RoomFollowModal
          userinfo={guestProfile}
          onCloseRoomFollow={onCloseRoomFollow}
        />
      </Modal>

      <div className="relative mt-3 font-semibold z-20">
        {isOpen && (
          <div className="bg-white rounded-lg w-[130px] h-[100px] border flex flex-col justify-center items-center absolute -right-14 top-8">
            <div
              className="border-b-2 w-full basis-1/2 flex items-center justify-center relative z-20"
              onClick={handleFollowClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {guestProfile.follow ? '팔로우취소' : '팔로우하기'}
            </div>

            <div
              className=" basis-1/2 flex items-center justify-center relative z-20 text-[#F81C1C]"
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
