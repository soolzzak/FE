import { useEffect, useState } from 'react';
import { DetailUserProfile, FindUserName } from '../../api/mypage';
import { useModal } from '../../hooks/useModal';
import { DetailUserInfoModal } from '../Mypage/DetailUserInfoModal';
import { Modal } from '../common/Modal';

export const SearchUserCard = ({ userData }: { userData: FindUserName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenDetailUser, onCloseDetailUser, setIsOpenDetailUser] = useModal();

  // const [, setUserInfo] = useAtom(userTokenAtom);
  console.log('가져오는지', userData);

  return (
    <>
      <Modal isOpen={isOpenDetailUser} onClose={onCloseDetailUser} hasOverlay>
        <DetailUserInfoModal
          userId={userData.userId}
          onClose={onCloseDetailUser}
        />
      </Modal>
      <div className="py-2">
        <div
          role="none"
          className="flex flex-row w-[288px] h-[88px] items-center bg-[#F5F5F7] rounded-xl gap-5 px-2"
          onClick={() => setIsOpenDetailUser(true)}
        >
          <img
            className="w-[64px] h-[64px] rounded-full object-cover"
            alt=""
            src={userData?.userImage}
          />
          <div className="text-xl font-semibold">{userData?.username}</div>
        </div>
      </div>
    </>
  );
};
