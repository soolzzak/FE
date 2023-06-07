import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { JwtPayload } from '../../pages/StreamRoom';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../../store/modalStore';
import {
  categorySelection,
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
  const getCookie = Cookies.get('accessKey');
  const userInfo = jwtDecode<JwtPayload>(getCookie || '').auth;

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
        console.log('카메라 연결불가', error);
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
    <div className="relative flex w-[1050px] h-[544.31px] bg-[#FFFFFF] rounded-[36px] justify-center items-center">
      <div className="w-[60%] h-[90%] flex flex-col justify-between items-center">
        <div className="text-2xl font-bold mt-5">
          {chatRoomInfo?.title} 얘기하면서 같이 소주마셔요!
        </div>

        <div className="w-[90%] bg-[#D9D9D9] rounded-[20px]">
          <video
            className="w-full h-full object-cover rounded-[20px]"
            ref={myVideoRef}
            autoPlay
            muted
          />
        </div>
      </div>

      <div className="w-[40%] h-[90%] flex flex-col justify-between items-center">
        <div className="flex items-center w-40 justify-center self-end gap-4 h-20 rounded-2xl bg-[#E0F5E6] mt-4 mr-12">
          <div>
            <img alt="userImg" className="w-14 h-14 rounded-full bg-black" />
          </div>
          <div>
            <p className="font-bold">곽준희님</p>
            <p className="font-bold">몇도</p>
          </div>
        </div>
        <div className="flex flex-col self-start items-start">
          {/* <p className="text-[#454545] font-semibold text-base mb-1">제목</p>
          <div className=" font-bold flex justify-center items-center mb-5">
            {chatRoomInfo?.title} 얘기하면서 같이 소주마셔요!
          </div> */}
          <p className="text-[#454545] font-semibold text-base mb-1">카테고리</p>
          <div className="w-[120px] h-9 bg-primary-100 text-primary-300 rounded-md font-bold flex justify-center items-center mb-5">
            {selections.map((tab, index) =>
              tab === category ? tabList[index] : null
            )}
          </div>
          <p className="text-[#454545] font-semibold text-base mb-1">성별</p>
          <div className="w-[120px] h-9 bg-primary-100 text-primary-300 rounded-md font-bold flex justify-center items-center mb-5">
            {gender}
          </div>
          {/* <p className="text-[#454545] font-semibold text-base mb-1">비밀번호</p> */}
          {/* <div className="flex items-center justify-center rounded-xl w-64 h-12 bg-[#D9D9D9] text-[18px] mb-3">
            누르면 5초 후에 입장해요😊
          </div> */}
          {/* {chatRoomInfo?.isPrivate ? null : (
            <input
            type="password"
            className="border" />
          )} */}
        </div>
        <button
          type="button"
          className="w-96 h-16 bg-primary-300 rounded-2xl text-[#FFFFFF] text-[22px] font-bold hover:bg-primary-400"
          onClick={() => {
            setIsOpenJoinRoom(false);
            setIsOpenWaitingRoom(true);
          }}
        >
          혼술짝 방 입장하기
        </button>
      </div>
      <div
        role="none"
        className="absolute right-3 top-3 hover:cursor-pointer"
        onClick={() => setIsOpenJoinRoom(false)}
      >
        <DeleteBtn />
      </div>
    </div>
  );
};
