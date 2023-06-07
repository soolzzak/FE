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
        <DetailUserInfoModal item={item} onClose={onCloseDetailUser} />
      </Modal>

      <div
        role="none"
        className="flex flex-row mt-4 items-center rounded-lg bg-[#F8F8F8]"
        onClick={() => setIsOpenDetailUser(true)}
      >
        <img
          className="min-w-[80px] h-20 rounded-full bg-[#9A9A9A] mr-4 object-cover"
          src={item.image}
          alt=""
        />
        <div>
          <p className="font-semibold">{item.username}</p>
          <p className="font-normal">{dateConvert(item.createdAt)}</p>
          {/* <p className="font-normal">{item.createdAt}</p> */}
        </div>
      </div>
    </div>
  );
};
