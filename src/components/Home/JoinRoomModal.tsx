import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMypageProfile } from '../../api/mypage';
import { getRoom } from '../../api/streamRoom';
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
        const response = await getRoom(roomNum?.toString(), roomPassword);
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
    // <div className="relative flex w-full bg-white rounded-[36px] justify-center items-center px-8 py-8">
    //   <div className="w-[70%] h-[90%] flex flex-col justify-between items-center px-4">
    //     <div className="w-[100%] h-[10%] text-left text-3xl font-bold truncate pl-1 pt-2">
    //       {chatRoomInfo?.title}
    //     </div>
    //     <div className="w-[100%] h-[90%] bg-[#D9D9D9] rounded-[20px]">
    //       <video
    //         className="w-full h-full object-cover rounded-[20px]"
    //         ref={myVideoRef}
    //         autoPlay
    //         muted
    //       />
    //     </div>
    //   </div>

    //   <div className="w-[40%] h-[90%] flex flex-col items-center self-center px-4">
    //     <div className="w-[100%] h-[10%]" />
    //     <div className="flex items-center justify-center self-end h-[15%] gap-4 rounded-2xl bg-[#E0F5E6] px-2">
    //       <div>
    //         <img
    //           alt="userImg"
    //           src={data?.data.userImage}
    //           className="w-14 min-w-[56px] h-14 rounded-full"
    //         />
    //       </div>

    //       <div>
    //         <p className="font-bold">{data?.data.username}님</p>
    //         <p className="font-bold">{data?.data.alcohol}%</p>
    //       </div>
    //     </div>
    //     <div className="w-[100%] h-[75%] flex flex-col justify-between ">
    //       <div className="mt-20">
    //         <p className="text-[#454545] font-semibold text-base mb-1">
    //           카테고리
    //         </p>
    //         <div className="join-room-modal-tag">
    //           {selections.map((tab, index) =>
    //             tab === category ? tabList[index] : null
    //           )}
    //         </div>
    //         <p className="text-[#454545] font-semibold text-base mb-1">성별</p>
    //         <div className="join-room-modal-tag">{gender}</div>
    //         {chatRoomInfo?.isPrivate ? (
    //           <>
    //             <p className="text-[#454545] font-semibold text-base mb-1">
    //               비밀번호
    //             </p>
    //             <input
    //               type="password"
    //               className="border border-secondary-300 rounded-md h-9"
    //               onChange={(e) => setRoomPassword(e.target.value)}
    //             />
    //           </>
    //         ) : null}
    //       </div>
    //       <button
    //         type="button"
    //         className="w-[100%] h-16 bg-primary-300 rounded-2xl text-[#FFFFFF] text-[22px] font-bold hover:bg-primary-400"
    //         onClick={enterRoomHandler}
    //       >
    //         혼술짝 방 입장하기
    //       </button>
    //     </div>
    //     {/* <div className="flex items-center justify-center rounded-xl w-64 h-12 bg-[#D9D9D9] text-[18px] mb-3">
    //         누르면 5초 후에 입장해요😊
    //       </div> */}
    //   </div>
    //   <div
    //     role="none"
    //     className="absolute right-3 top-2 hover:cursor-pointer"
    //     onClick={() => setIsOpenJoinRoom(false)}
    //   >
    //     <DeleteBtn />
    //   </div>
    // </div>
    <div className="bg-white p-10 rounded-2xl">
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
