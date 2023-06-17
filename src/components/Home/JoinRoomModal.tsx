import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getMypageProfile } from '../../api/mypage';
import { checkRoomPassword } from '../../api/streamRoom';
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

  const enterRoomHandler = async () => {
    try {
      if (roomNum) {
        await checkRoomPassword(roomNum?.toString(), roomPassword);
        setIsOpenWaitingRoom(true);
        setIsOpenJoinRoom(false);
      }
    } catch (error: any) {
      if (error.response.data.message === 'The passwords do not match.') {
        toast.error('비밀번호를 확인해주세요');
      }
    }
  };

  const getMediaStream = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
    } catch (error) {
      toast.error('카메라를 확인해주세요');
    }
  };

  const mediaStreamMutation = useMutation(getMediaStream, {
    onSuccess: () => {
      // console.log('mediastream??', mediaStream);
      // console.log('myvideo??', myVideoRef);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = mediaStream;
        // console.log('mediastream', mediaStream);
      }
    },
  });

  useEffect(() => {
    if (chatRoomInfo) {
      setCategory(chatRoomInfo.category);
      setGender(genderSelection(chatRoomInfo.genderSetting) as string);
    }

    mediaStreamMutation.mutate();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-white px-12 py-8 rounded-2xl min-w-[350px]">
      <div className="w-full text-3xl font-bold truncate">
        &quot;{chatRoomInfo?.title}&quot;
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {mediaStreamMutation.isLoading && (
            <div className="w-full h-full max-w-[640px] rounded-2xl bg-black">
              Loading...
            </div>
          )}
          <video
            className="w-full h-full max-w-[640px] object-cover rounded-2xl"
            ref={myVideoRef}
            autoPlay
            muted
          />
        </div>

        <div className="col-span-1 w-full">
          <div className="grid grid-cols-2 grid-rows-6">
            <div className="col-span-2 rounded-2xl w-full">
              <div className="flex w-full flex-row-reverse">
                <div className="bg-primary-100 f-jic rounded-2xl px-3 py-1">
                  <img
                    alt="userImg"
                    src={data?.data.userImage}
                    className="w-14 min-w-[56px] h-14 rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold lg:text-base text-xs truncate">
                      {data?.data.username}님
                    </p>
                    <p className="font-bold lg:text-base text-xs truncate">
                      {data?.data.alcohol}%
                    </p>
                  </div>
                </div>
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
                <p className="text-[#454545] font-semibold text-base">
                  비밀번호
                </p>
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
