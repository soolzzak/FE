import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MainpageRooms, getMainpageRooms } from '../../api/main';
import { displayedTabAtom, tabAtom } from '../../store/mainpageStore';
import { ChatroomCard } from './ChatroomCard';
import { FilterPanel } from './FilterPanel';

export const HomeBodySection = () => {
  const [tab] = useAtom(tabAtom);
  const [displayedTab] = useAtom(displayedTabAtom);

  const { data, isError, error } = useQuery(
    ['chatrooms', tab],
    () => getMainpageRooms(tab),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [chatList, setChatList] = useState<MainpageRooms[] | undefined>([]);

  useEffect(() => {
    if (data) {
      setChatList(data.data.content);
      console.log(data.data);
    }
  }, [data]);

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }
  return (
    <section className="flex-grow w-full min-h-[82vh]">
      <div className="f-ic-col min-w-[660px]">
        <div className="px-5 w-full max-w-[1000px]">
          <div className="f-ic justify-between my-10 w-full">
            <p className="font-bold text-xl">{displayedTab}</p>
            <FilterPanel />
          </div>
          {!chatList?.length && <div className="f-jic"> 방이 없습니다.</div>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full mb-14 mx-14 md:mx-0">
            {chatList &&
              chatList.map((chatRoom) => (
                <div className="flex justify-center" key={chatRoom.roomId}>
                  <ChatroomCard chatRoom={chatRoom} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
