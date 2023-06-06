import { TabUserList } from '../../api/mypage';
import { dateConvert } from '../../utils/dateConvert';

export const HistoryCard = ({ item }: { item: TabUserList }) => {
  console.log(item);
  return (
    <div className="flex flex-row mt-4 items-center rounded-md bg-[#e5e0e0]">
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
  );
};
