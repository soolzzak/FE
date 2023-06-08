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
import { usernameAtom } from '../../store/mainpageStore';

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
  console.log('d', userInfo);

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
    <div className="relative flex w-[1050px] h-[600px] bg-[#FFFFFF] rounded-[36px] justify-center items-center px-5">
      <div className="w-[70%] h-[90%] flex flex-col justify-between items-center px-4">
        <div className="w-[100%] h-[10%] text-left text-3xl font-bold truncate pl-1 pt-2">
          {chatRoomInfo?.title}
        </div>
        <div className="w-[100%] h-[90%] bg-[#D9D9D9] rounded-[20px]">
          <video
            className="w-full h-full object-cover rounded-[20px]"
            ref={myVideoRef}
            autoPlay
            muted
          />
        </div>
      </div>

      <div className="w-[40%] h-[90%] flex flex-col items-center self-center px-4">
        <div className="w-[100%] h-[10%]" />
        <div className="flex items-center w-40 justify-center self-end h-[15%] gap-4 rounded-2xl bg-[#E0F5E6]">
          <div>
            <img alt="userImg" className="w-14 h-14 rounded-full bg-black" />
          </div>

          <div>
            <p className="font-bold">곽준희님</p>
            <p className="font-bold">몇도</p>
          </div>
        </div>
        <div className="w-[100%] h-[75%] flex flex-col justify-between ">
          <div className='mt-20'>
            <p className="text-[#454545] font-semibold text-base mb-1">
              카테고리
            </p>
            <div className="w-[120px] h-9 bg-secondary-100 text-secondary-300 rounded-md font-bold flex justify-center items-center mb-5">
              {selections.map((tab, index) =>
                tab === category ? tabList[index] : null
              )}
            </div>
            <p className="text-[#454545] font-semibold text-base mb-1">성별</p>
            <div className="w-[120px] h-9 bg-secondary-100 text-secondary-300 rounded-md font-bold flex justify-center items-center mb-5">
              {gender}
            </div>

            {chatRoomInfo?.isPrivate ? (
              <>
                <p className="text-[#454545] font-semibold text-base mb-1">
                  비밀번호
                </p>
                <input
                  type="password"
                  className="border border-secondary-300 rounded-md h-9"
                />
              </>
            ): null}
          </div>
          <button
            type="button"
            className="w-[100%] h-16 bg-primary-300 rounded-2xl text-[#FFFFFF] text-[22px] font-bold hover:bg-primary-400"
            onClick={() => {
              setIsOpenJoinRoom(false);
              setIsOpenWaitingRoom(true);
            }}
          >
            혼술짝 방 입장하기
          </button>
        </div>
        {/* <div className="flex items-center justify-center rounded-xl w-64 h-12 bg-[#D9D9D9] text-[18px] mb-3">
            누르면 5초 후에 입장해요😊
          </div> */}
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
