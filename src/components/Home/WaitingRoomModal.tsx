import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CancelButton } from '../common/CancelButton';
import { isOpenWaitingAtom } from '../../store/modalStore';
import { chatRoomInfoAtom } from './ChatroomCard';

export const WaitingRoomModal = ({
  count,
  onClose,
  startAfterTimeout,
}: {
  count?: number;
  onClose?: () => void;
  startAfterTimeout?: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const navigation = useNavigate();
  const [, setIsOpenWaitingRoom] = useAtom(isOpenWaitingAtom);
  const [chatRoomInfo] = useAtom(chatRoomInfoAtom);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    if (timeLeft === 0 && !count) {
      clearInterval(timer);
      setIsOpenWaitingRoom(false);
      navigation(`/room/${chatRoomInfo?.roomId}`);
    } else if (timeLeft === 0 && onClose && startAfterTimeout) {
      startAfterTimeout();
      onClose();
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, setIsOpenWaitingRoom]);

  return (
    <div
      className={`relative bg-[#FFFFFF] rounded-[30px] border text-center flex flex-col justify-center items-center
      ${count ? 'w-[450px] h-[250px]' : 'w-[600px] h-[350px]'}`}
    >
      {count ? (
        <div className="font-bold text-2xl text-[#454545] mb-2">
          {timeLeft}초 뒤에 사진이 찍혀요!
        </div>
      ) : (
        <div className="font-bold text-2xl text-[#454545] mb-2">
          {timeLeft}초 뒤에 {chatRoomInfo?.username}님의 방으로 입장합니다!
        </div>
      )}

      <div className="flex justify-center items-center w-20 h-20 font-bold text-[40px] text-[#454545] mb-2 border border-[#AEAEAE] rounded-full">
        {timeLeft}
      </div>

      <div className="font-semibold text-xl text-[#454545] mb-2">
        매너와 예의를 지키며 즐겁게 혼술짝 해요😊
      </div>

      {!count && (
        <div className="w-[472.23px] h-[90px] bg-[#FAFAFA] flex flex-col justify-center">
          <p className="font-medium text-lg text-[#454545]">
            바르고 고운말은 기본!
          </p>
          <p className="font-medium text-lg text-[#454545]">
            예의없는 행동시 신고 대상이 됩니다.
          </p>
        </div>
      )}
      <CancelButton onClose={() => setIsOpenWaitingRoom(false)} />
    </div>
  );
};
