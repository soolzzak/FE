import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MainpageRooms, getMainpageRooms } from '../api/main';
import { ChatroomCard } from '../components/Home/ChatroomCard';
import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';

export const Home = () => {
  // const { data, isLoading, isError, error } = useQuery(
  //   'chatrooms',
  //   getMainpageRooms,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );
  const [chatList, setChatList] = useState<MainpageRooms[] | undefined>([
    { roomId: 1, category: 'something', title: 'title1', username: 'user1' },
    { roomId: 2, category: 'something', title: 'title1', username: 'user1' },
    { roomId: 3, category: 'something', title: 'title1', username: 'user1' },
    { roomId: 4, category: 'something', title: 'title1', username: 'user1' },
    { roomId: 5, category: 'something', title: 'title1', username: 'user1' },
  ]);

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
    <div className="flexCentralize flex-col bg-[#F2F2F2;]">
      <HeroSection />
      <CategoryTab />
      <div className="grid grid-cols-4 gap-4 mt-24">
        {chatList?.map((chatRoom) => (
          <ChatroomCard key={chatRoom.roomId} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
};
