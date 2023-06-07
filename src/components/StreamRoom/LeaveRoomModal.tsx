import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isOpenLeaveRoomAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';

export const LeaveRoomModal = () => {
  const [,setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const navigation = useNavigate();
  return (
    <div className="relative w-[550px] h-52 bg-[#FFFFFF] rounded-[30px] flex flex-col justify-center items-center">
      <div className="text-2xl font-semibold">방을 나가시겠어요?</div>

      <div className="flex gap-4 mt-14">
        <button
          type="button"
          className="w-36 h-11 text-base font-semibold text-[#6A6A6A] rounded-lg border border-[#6A6A6A] text-center hover:bg-opacity-80"
          onClick={() => setIsOpenLeaveRoom(false)}
        >
          아니요
        </button>
        <button
          type="button"
          className="w-36 h-11 text-base font-semibold text-[#6A6A6A] rounded-lg border border-[#6A6A6A] bg-[#DEDEDE] text-center hover:bg-opacity-80"
          onClick={() => navigation('/')}
        >
          네, 나갈께요
        </button>
      </div>

      <CancelButton onClose={() => setIsOpenLeaveRoom(false)}/>
    </div>
  );
};
