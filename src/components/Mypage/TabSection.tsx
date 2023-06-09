import { HistoryCard } from './HistoryCard';
import { TabUserList } from '../../api/mypage';

export const TabSection = ({ infolist }: { infolist: TabUserList[] }) => {
  const uniqueKey = new Set();

  const generateUniqueKey = () => {
    let id = Math.floor(Math.random() * 1000);
    while (uniqueKey.has(id)) {
      id = Math.floor(Math.random() * 1000);
    }
    uniqueKey.add(id);
    return id;
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 mt-5  ">
      {infolist?.map((item) => (
        <HistoryCard item={item} key={generateUniqueKey()} />
      ))}
    </div>
  );
};
// console.log(infolist);

// 얘가 원래
//   return (
//     <div className="grid grid-cols-2 gap-4 mt-5 ">
//       {infolist?.map((item) => (
//         <HistoryCard item={item} key={item.userId} />
//       ))}
//     </div>
//   );
// };
