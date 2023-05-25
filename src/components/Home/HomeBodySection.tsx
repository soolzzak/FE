import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ChatroomCard } from './ChatroomCard';
import { getMainpageRooms } from '../../api/main';
import { MainpageRooms } from '../../api/main';
export const HomeBodySection = () => {
  // const { data, isLoading, isError, error } = useQuery(
  //   'chatrooms',
  //   getMainpageRooms,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );
  const [chatList, setChatList] = useState<MainpageRooms[] | undefined>([]);

  // useEffect(() => {
  //   if (data) {
  //     setChatList(data.data);
  //     console.log(data.data);
  //   }
  // }, [data]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (isError) {
  //   return <p>{(error as Error).message}</p>;
  // }
  return (
    <div className="flexCentralized">
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24 h-full">
        {chatList?.map((chatRoom) => (
          <ChatroomCard key={chatRoom.roomId} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
};
