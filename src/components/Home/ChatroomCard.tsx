import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainpageRooms } from '../../api/main';
import {
  categorySelection,
  genderSelection,
} from '../../utils/switchSelections';

type ChatroomCardProps = {
  chatRoom: MainpageRooms;
};

export const ChatroomCard = ({ chatRoom }: ChatroomCardProps) => {
  const [category, setCategory] = useState('');
  const [genderSetting, setGenderSetting] = useState('');
  const navigate = useNavigate();
  const alcohol = `h-2 rounded-full bg-secondary-200 w-[${chatRoom.alcohol}%]`;

  useEffect(() => {
    setCategory(categorySelection(chatRoom.category) as string);
    setGenderSetting(genderSelection(chatRoom.genderSetting) as string);
  }, []);
  console.log(alcohol);
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      role="none"
      className="cursor-pointer f-ic-col rounded-3xl bg-white w-[231px] h-[306px] py-3.5 px-3.5 relative shadow"
      onClick={() => navigate(`/room/${chatRoom.roomId}`)}
    >
      {/* image */}
      <img
        alt={chatRoom.title}
        src={chatRoom.roomImageUrl}
        className="w-full h-36 bg-[#D9D9D9] rounded-[20px]"
      />
      {/* body */}
      <div className="flex self-start w-full relative">
        <div className="flex self-start gap-2">
          <span className="mt-2.5 text-xs text-left bg-gray-100 px-1 rounded">
            {category}
          </span>
          <span className="mt-2.5 text-xs text-left bg-gray-100 px-1 rounded">
            {genderSetting}
          </span>
        </div>
        <span
          className={`mt-2.5 text-xs absolute right-1 font-semibold bg-primary-50 px-1 rounded
          ${chatRoom.hasGuest ? 'text-red-600' : 'text-green-600'}`}
        >
          {chatRoom.hasGuest ? '2/2' : '1/2'}
        </span>
      </div>
      <div className="self-start mt-1 text-lg text-left">{chatRoom.title}</div>
      <div className="absolute bottom-5 f-ic w-full px-3.5">
        {chatRoom.userImageUrl ? (
          <img
            alt="Profile Pic"
            src={chatRoom.userImageUrl}
            className="w-10 h-10 rounded-full shadow"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 shadow" />
        )}
        <div className="f-col justify-between ml-3 h-full w-36">
          <div className="pb-1 text-sm">{chatRoom.username}</div>
          <div className="h-2 rounded-lg bg-secondary-100 z-0 shadow">
            <div className={alcohol} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
