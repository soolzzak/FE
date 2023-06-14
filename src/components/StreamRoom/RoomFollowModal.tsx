import { useEffect, useState } from 'react';
import { DetailUserProfile } from '../../api/mypage';

export const RoomFollowModal = ({
  onCloseRoomFollow,
  userinfo,
}: {
  onCloseRoomFollow: () => void;
  userinfo: DetailUserProfile;
}) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`w-[164px] h-[54px]  text-[#FF6700] flex justify-center items-center text-xl rounded-lg bg-white bg-opacity-70 transition-opacity duration-1000 ${
        showModal ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {userinfo.follow ? '팔로우 취소' : '팔로우 완료🍻'}
    </div>
  );
};
