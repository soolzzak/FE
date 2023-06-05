import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainpageRooms } from '../../api/main';

type ChatroomCardProps = {
  chatRoom: MainpageRooms;
};

export const ChatroomCard = ({ chatRoom }: ChatroomCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      role="none"
      className="cursor-pointer f-ic-col rounded-3xl bg-white w-[231px] h-[306px] py-5 px-3.5 relative shadow"
      onClick={() => navigate(`/room/${chatRoom.roomId}`)}
    >
      {/* image */}
      <img
        alt={chatRoom.title}
        src={chatRoom.roomImageUrl}
        className="w-full h-40 bg-[#D9D9D9] rounded-[20px]"
      />
      {/* body */}
      <div className="self-start mt-2.5 text-lg text-left">
        {chatRoom.title}
      </div>
      <div className="absolute bottom-5 f-ic w-full px-3.5">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="f-col justify-between ml-3 h-full w-36">
          <div className="pb-1">{chatRoom.username}</div>
          <div className="w-full h-3 rounded-lg bg-[#9A9A9A;]" />
        </div>
      </div>
    </motion.div>
  );
};
