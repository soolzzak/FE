import React from 'react';
import { useQuery } from 'react-query';
import { MainpageRooms, getMainpageRooms } from '../api/main';
import { ChatroomCard } from '../components/Home/ChatroomCard';

export const Home = () => {
  const { data, isLoading, isError, error } = useQuery(
    'chatrooms',
    getMainpageRooms
  );
  const [chatList, setChatList] = React.useState<MainpageRooms[]>();

  React.useEffect(() => {
    if (data) {
      setChatList(data.data);
      console.log(data.data);
    }
  }, [data]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{(error as Error).message}</p>;
  }

  return (
    <div>
      <div>
        {chatList?.map((chatRoom) => (
          <ChatroomCard key={chatRoom.roomId} chatRoom={chatRoom} />
        ))}
      </div>
      <div></div>
    </div>
  );
};
