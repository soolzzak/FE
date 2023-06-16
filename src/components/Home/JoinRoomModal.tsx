import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMypageProfile } from '../../api/mypage';
import { checkRoomPassword, getRoom } from '../../api/streamRoom';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { roomPasswordAtom } from '../../store/addRoomStore';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../../store/modalStore';
import {
  genderSelection,
  selections,
  tabList,
} from '../../utils/switchSelections';
import { chatRoomInfoAtom } from './ChatroomCard';

export const JoinRoomModal = () => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  let mediaStream: MediaStream | null = null;
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [, setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom);
  const [, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom);
  const [chatRoomInfo] = useAtom(chatRoomInfoAtom);
  const { data } = useQuery('userProfile', getMypageProfile);
  const [roomPassword, setRoomPassword] = useAtom(roomPasswordAtom);
  const roomNum = chatRoomInfo?.roomId;
  const navigate = useNavigate();
  const enterRoomHandler = async () => {
    try {
      if (roomNum) {
        const response = await checkRoomPassword(roomNum?.toString(),roomPassword);
        setIsOpenWaitingRoom(true);
        setIsOpenJoinRoom(false);
      }
    } catch (error: any) {
      if (error.response.data.message === 'The passwords do not match.') {
        toast.error('비밀번호를 확인해주세요');
      }
    }
  };

  useEffect(() => {
    if (chatRoomInfo) {
      setCategory(chatRoomInfo.category);
      setGender(genderSelection(chatRoomInfo.genderSetting) as string);
    }
    const getMediaStream = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        toast.error('카메라를 확인해주세요');
      }
    };

    getMediaStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-white px-12 py-8 rounded-2xl">
      <div className="w-full text-3xl font-bold truncate">
        &apos;{chatRoomInfo?.title}&apos;
      </div>

      <div className="flex flex-row w-full gap-4">
        <div className="w-8/12 rounded-2xl">
          <video
            className="w-full h-full object-cover rounded-2xl"
            ref={myVideoRef}
            autoPlay
            muted
          />
        </div>

        <div className="w-4/12 grid grid-cols-2 grid-rows-6">
          <div className="col-start-2 bg-primary-100 rounded-2xl f-jic">
            <img
              alt="userImg"
              src={data?.data.userImage}
              className="w-14 min-w-[56px] h-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold lg:text-base text-xs truncate">{data?.data.username}님</span>
              <span className="font-bold lg:text-base text-xs truncate">{data?.data.alcohol}%</span>
            </div>
          </div>

          <div
            className={`col-span-2 ${
              chatRoomInfo?.isPrivate ? 'row-start-3' : 'row-start-4'
            }`}
          >
            <p className="text-[#454545] font-semibold text-base">카테고리</p>
            <div className="join-room-modal-tag">
              {selections.map((tab, index) =>
                tab === category ? tabList[index] : null
              )}
            </div>
          </div>

          <div
            className={`col-span-2 ${
              chatRoomInfo?.isPrivate ? 'row-start-4' : 'row-start-5'
            }`}
          >
            <p className="text-[#454545] font-semibold text-base">성별</p>
            <div className="join-room-modal-tag">{gender}</div>
          </div>

          {chatRoomInfo?.isPrivate ? (
            <div
              className={`col-span-2 ${
                chatRoomInfo?.isPrivate ? 'row-start-5' : ''
              }`}
            >
              <p className="text-[#454545] font-semibold text-base">비밀번호</p>
              <input
                type="password"
                className="border-2 border-secondary-300 rounded-md h-9 indent-2"
                onChange={(e) => setRoomPassword(e.target.value)}
              />
            </div>
          ) : null}

          <button
            type="button"
            className="col-span-2 row-start-6 bg-primary-300 text-white lg:text-xl text-lg rounded-2xl font-bold hover:bg-primary-400"
            onClick={enterRoomHandler}
          >
            혼술짝 방 입장하기
          </button>
        </div>
      </div>
      <div
        role="none"
        className="absolute right-3 top-2 hover:cursor-pointer"
        onClick={() => setIsOpenJoinRoom(false)}
      >
        <DeleteBtn />
      </div>
    </div>
  );
};
