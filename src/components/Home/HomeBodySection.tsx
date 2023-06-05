import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MainpageRooms, getMainpageRooms } from '../../api/main';
import { ChatroomCard } from './ChatroomCard';
import { ArrowDown } from '../../assets/svgs/ArrowDown';
import { FilterPanel } from './FilterPanel';

export const HomeBodySection = () => {
  const { data, isError, error } = useQuery('chatrooms', getMainpageRooms, {
    refetchOnWindowFocus: false,
  });
  const [chatList, setChatList] = useState<MainpageRooms[] | undefined>([]);

  useEffect(() => {
    if (data) {
      setChatList(data.data);
      console.log(data.data);
    }
  }, [data]);

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }
  return (
    <section className="flex-grow w-full">
      <div className="f-ic-col min-w-[660px]">
        <div className="px-5">
          <div className="f-ic justify-between my-10 w-full">
            <p className="font-bold text-xl">🍹 전체 혼술짝 방 리스트</p>

            <FilterPanel />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full mb-14">
            {chatList?.map((chatRoom) => (
              <ChatroomCard key={chatRoom.roomId} chatRoom={chatRoom} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
