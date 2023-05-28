import { useState } from 'react';
import { MainpageRooms } from '../../api/main';
import { ChatroomCard } from './ChatroomCard';

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
    <div className="f-jic">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24 h-full">
        {chatList?.map((chatRoom) => (
          <ChatroomCard key={chatRoom.roomId} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
};
