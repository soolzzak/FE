import { HistoryCard } from './HistoryCard';
import { TabUserList } from '../../api/mypage';

export const TabSection = ({ infolist }: { infolist: TabUserList[] }) => {
  console.log(infolist);

  return (
    <div className="grid grid-cols-2 gap-4 gap-y-6 p-4">
      {infolist?.map((item) => (
        <HistoryCard item={item} key={item.userId} />
      ))}
    </div>
  );
};
