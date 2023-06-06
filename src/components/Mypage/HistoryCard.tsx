import { TabUserList } from '../../api/mypage';
import { dateConvert } from '../../utils/dateConvert';
import { DetailUserInfoModal } from './DetailUserInfoModal';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';

export const HistoryCard = ({ item }: { item: TabUserList }) => {
  const [isOpenDetailUser, onCloseDetailUser, setIsOpenDetailUser] = useModal();

  return (
    <div>
      <Modal isOpen={isOpenDetailUser} onClose={onCloseDetailUser} hasOverlay>
        <DetailUserInfoModal onClose={onCloseDetailUser} />
      </Modal>

      <div
        role="none"
        className="flex flex-row mt-4 items-center rounded-lg bg-[#e5e0e0]"
        onClick={() => setIsOpenDetailUser(true)}
      >
        <img
          className="w-20 h-20 rounded-full bg-[#9A9A9A] mr-4"
          src={item.image}
          alt=""
        />
        <div>
          <p className="font-semibold">{item.userId}</p>
          <p className="font-normal">{dateConvert(item.createdAt)}</p>
          {/* <p className="font-normal">{item.createdAt}</p> */}
        </div>
      </div>
    </div>
  );
};
