import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { CancelButton } from '../common/CancelButton';

export const WaitingRoomModal = ({ onCloaseWaitingRoom }: { onCloaseWaitingRoom: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onCloaseWaitingRoom();
      navigation('/room')
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, onCloaseWaitingRoom]);

  return (
    <div className="relative w-[620px] h-[350px] bg-[#FFFFFF] rounded-[30px] border text-center flex flex-col justify-center items-center">
      <div className="font-bold text-2xl text-[#454545] mb-2">
        {timeLeft}초 뒤에 곽준희님의 방으로 입장합니다!
      </div>

      <div className="flex justify-center items-center w-20 h-20 font-bold text-[40px] text-[#454545] mb-2 border border-[#AEAEAE] rounded-full">
        {timeLeft}
      </div>

      <div className="font-semibold text-xl text-[#454545] mb-2">
        매너와 예의를 지키며 즐겁게 혼술짝 해요😊
      </div>

      <div className="w-[472.23px] h-[90px] bg-[#FAFAFA] flex flex-col justify-center">
        <p className="font-medium text-lg text-[#454545]">
          바르고 고운말은 기본!
        </p>
        <p className="font-medium text-lg text-[#454545]">
          예의없는 행동시 신고 대상이 됩니다.
        </p>
      </div>
      <CancelButton onClose={onCloaseWaitingRoom} />
    </div>
  );
};
