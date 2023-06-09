import { HistoryCard } from './HistoryCard';
import { TabUserList } from '../../api/mypage';

export const TabSection = ({ infolist }: { infolist: TabUserList[] }) => {
  console.log(infolist);

  // 얘가 원래
  //   return (
  //     <div className="grid grid-cols-2 gap-4 mt-5 ">
  //       {infolist?.map((item) => (
  //         <HistoryCard item={item} key={item.userId} />
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5  ">
      {infolist?.map((item) => (
        <HistoryCard item={item} key={item.userId} />
      ))}
    </div>
  );
};
