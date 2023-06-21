import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  DetailUserProfile,
  TabUserList,
  getDetailUserProfile,
} from '../../api/mypage';
import { useModal } from '../../hooks/useModal';
import { dateConvert } from '../../utils/dateConvert';
import { Modal } from '../common/Modal';
import { DetailUserInfoModal } from './DetailUserInfoModal';

export const HistoryCard = ({ item }: { item: TabUserList }) => {
  const [isOpenDetailUser, onCloseDetailUser, setIsOpenDetailUser] = useModal();

  return (
    <div>
      <Modal isOpen={isOpenDetailUser} onClose={onCloseDetailUser} hasOverlay>
        <DetailUserInfoModal userId={item.userId} onClose={onCloseDetailUser} />
      </Modal>

      <div
        role="none"
        className="flex flex-row mt-4 items-center rounded-xl bg-[#F8F8F8] shadow-sm"
        onClick={() => setIsOpenDetailUser(true)}
      >
        <div>
          <img
            className="w-[64px] h-[64px] m-2 rounded-full  bg-[#B6ECC4] mr-4 object-cover shadow"
            src={item.userImage}
            alt=""
          />
        </div>
        <div>
          <p className="font-semibold">{item.username}</p>
          <p className="font-normal">{dateConvert(item.createdAt)}</p>
          {/* <p className="font-normal">{item.createdAt}</p> */}
        </div>
      </div>
    </div>
  );
};
