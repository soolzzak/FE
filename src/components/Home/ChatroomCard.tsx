import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MainpageRooms } from '../../api/main';
import { userTokenAtom } from '../../store/mainpageStore';
import {
  isOpenAuthModalAtom,
  isOpenJoinRoomAtom,
} from '../../store/modalStore';
import {
  categorySelection,
  genderSelection,
} from '../../utils/switchSelections';
import { checkIfRoomIsEmpty } from '../../api/streamRoom';
import { Modal } from '../common/Modal';
import { AuthModal } from '../Header/AuthModal';

export const chatRoomInfoAtom = atom<MainpageRooms | null>(null);
export const ChatroomCard = ({ chatRoom }: { chatRoom: MainpageRooms }) => {
  const [, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [, setChatRoomInfo] = useAtom(chatRoomInfoAtom);
  const [category, setCategory] = useState('');
  const [genderSetting, setGenderSetting] = useState('');
  const [userToken] = useAtom(userTokenAtom);
  const [, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);

  useEffect(() => {
    setCategory(categorySelection(chatRoom.category) as string);
    setGenderSetting(genderSelection(chatRoom.genderSetting) as string);
  }, []);
  const handleCardClick = async () => {
    if (Object.keys(userToken as object).length === 0) {
      setIsOpenAuth(true);
      return;
    }
    if (chatRoom.roomCapacity >= 2) {
      toast.error('방이 찼습니다!');
      return;
    }
    if (
      chatRoom.genderSetting !== 'ANY' &&
      userToken?.auth.gender !== chatRoom.genderSetting
    ) {
      toast.error(`${genderSetting} 들어오세요`);
      return;
    }

    const response = await checkIfRoomIsEmpty(chatRoom.roomId.toString());
    if (response?.response?.data.message === 'This user is blocked.') {
      return toast.error('차단되었습니다');
    }
    if (
      response?.response?.data.message ===
      'Another user has already joined the room.'
    ) {
      return toast.error('방이 꽉 찼습니다');
    }
    setChatRoomInfo(chatRoom as MainpageRooms);
    setIsOpenJoinRoom(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      role="none"
      className="cursor-pointer w-full f-ic-col rounded-2xl bg-white h-[366px] py-5 px-3.5 relative shadow-sm"
      onClick={handleCardClick}
    >
      {/* image */}
      <img
        alt={chatRoom.title}
        src={chatRoom.roomImageUrl}
        className="w-full h-44 bg-[#D9D9D9] rounded-xl"
      />
      {/* body */}
      <div className="flex mt-0.5 self-start w-full relative">
        <div className="flex self-start gap-2">
          <span className="mt-2.5 text-sm text-left bg-gray-100 px-2 py-0.5 rounded">
            {category}
          </span>
          <span className="mt-2.5 text-sm text-left bg-gray-100 px-2 py-0.5  rounded">
            {genderSetting}
          </span>
        </div>
        <span
          className={`mt-2.5 text-sm absolute right-1 font-semibold px-2 py-0.5 rounded
          ${
            chatRoom.roomCapacity === 2
              ? 'text-red-600 bg-secondary-50'
              : 'text-green-600 bg-primary-50'
          }`}
        >
          {chatRoom.roomCapacity >= 2 ? '2/2' : '1/2'}
        </span>
      </div>
      <div className="self-start mt-1 text-xl font-bold text-left overflow-hidden w-full">
        <div className="h-[52px] mt-2 overflow-ellipsis overflow-hidden w-full text-[#1A1C20]">
          {chatRoom.title}
        </div>
      </div>
      <div className="absolute bottom-5 f-ic w-full px-3.5 pr-4">
        {chatRoom.userImage ? (
          <img
            alt="Profile Pic"
            src={chatRoom.userImage}
            className="w-10 min-w-[50px] h-[50px] rounded-full object-cover shadow"
          />
        ) : (
          <div className="w-10 min-w-[40px] h-10 rounded-full bg-gray-300 shadow-sm" />
        )}
        <div className="f-col ml-3 w-5/6">
          <div className="text-md mb-1">{chatRoom.username}</div>
          <div className="h-2 rounded-lg bg-primary-100 z-0 shadow-sm">
            <div
              className="h-2 rounded-full bg-primary-200"
              style={{ width: `${chatRoom.alcohol}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
