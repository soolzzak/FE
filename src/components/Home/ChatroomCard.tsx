import { MainpageRooms } from '../../api/main';

type ChatroomCardProps = {
  chatRoom: MainpageRooms;
};

export const ChatroomCard = ({ chatRoom }: ChatroomCardProps) => (
  <div className="f-ic-col rounded-3xl bg-white w-[261px] h-[356px] py-5 px-3.5 relative">
    {/* image */}
    <img
      alt={chatRoom.title}
      src={chatRoom.roomImageUrl}
      className="w-full h-48 bg-[#D9D9D9] rounded-[20px]"
    />
    {/* body */}
    <div className="self-start mt-2.5 text-xl text-left">{chatRoom.title}</div>
    <div className="absolute bottom-5 f-ic">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="f-col justify-between ml-3 w-44 h-full">
        <div className="pb-1">{chatRoom.username}</div>
        <div className="w-full h-3 rounded-lg bg-[#9A9A9A;]" />
      </div>
    </div>
  </div>
);
