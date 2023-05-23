import React from 'react';
import { MainpageRooms } from '../../api/main';

type ChatroomCardProps = {
  chatRoom: MainpageRooms;
};

export const ChatroomCard = ({ chatRoom }: ChatroomCardProps) => {
  return (
    <div>
      <div>{chatRoom.title}</div>
      <div>{chatRoom.username}</div>
      <div>{chatRoom.category}</div>
    </div>
  );
};
