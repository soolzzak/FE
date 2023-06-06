import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { CancelButton } from '../common/CancelButton';
import { isOpenJoinRoomAtom, isOpenWaitingAtom } from '../../store/modalStore';
import { chatRoomInfoAtom } from './ChatroomCard';

export const JoinRoomModal = () => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  let mediaStream: MediaStream | null = null;

  useEffect(() => {
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
  
  const [,setIsOpenJoinRoom] = useAtom(isOpenJoinRoomAtom)
  const [, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom)
  const [chatRoomInfo] = useAtom(chatRoomInfoAtom)

  return (
    <div className="relative flex w-[1050px] h-[544.31px] bg-[#FFFFFF] rounded-[36px]">
      <div className="w-3/5 flex flex-col items-center justify-center">
        <div className="text-2xl h-1/6 font-bold">
          {chatRoomInfo?.category} 얘기하면서 같이 소주마셔요!
        </div>

        <div className="w-[520.78px] h-4/6 bg-[#D9D9D9] rounded-[20px]">
          <video
            className="w-full h-full object-cover rounded-[20px]"
            ref={myVideoRef}
            autoPlay
            muted
          />
        </div>
      </div>

      <div className="w-2/5">
        <div className="flex h-1/6 justify-end items-center mt-6 mr-10">
          <div className="flex-col">
            <div className="w-11 h-4 bg-[#D9D9D9] mr-5" />
            <div className="text-xl font-bold text-[#4A4A4A]">{chatRoomInfo?.alcohol} °C</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]" />
        </div>
        <div className="h-4/6 flex flex-col items-center justify-end">
          <div className="flex items-center justify-center rounded-xl w-64 h-12 bg-[#D9D9D9] text-[18px] mb-5">
            누르면 5초 후에 입장해요😊
          </div>
          {chatRoomInfo?.roomPassword? (
            <input type='password' className='border'/>
          ) : null}
          <button
            type="button"
            className="w-72 h-16 bg-[#9A9A9A] rounded-2xl text-[#FFFFFF] text-[22px] font-bold hover:bg-opacity-80"
            onClick={() => {
              setIsOpenJoinRoom(false);
              setIsOpenWaitingRoom(true);
            }}
          >
            혼술짝 방 입장하기
          </button>
        </div>
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
