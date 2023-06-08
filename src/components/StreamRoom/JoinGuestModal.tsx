import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { isOpenJoinHostAtom } from '../../store/modalStore';

export const JoinGuestModal = () => {
  const [,setIsOpenJoinHost] = useAtom(isOpenJoinHostAtom)
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsOpenJoinHost(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft,setIsOpenJoinHost]);

  return (
    <div className="w-[600px] h-[400px] bg-[#FFFFFF] rounded-[30px] border text-center flex flex-col justify-center items-center">
      <div className='font-bold text-2xl text-[#454545] mb-2'>{timeLeft}초 뒤에 카리나님이 입장합니다!</div>

      <div className='flex justify-center items-center w-20 h-20 font-bold text-[40px] text-[#454545] mb-2 border border-primary-300 rounded-full'>{timeLeft}</div>

      <div className='font-semibold text-xl text-[#454545] mb-2'>매너와 예의를 지키며 즐겁게 혼술짝 해요 😊</div>

      <div className='w-[472.23px] h-[90px] bg-[#FAFAFA] flex flex-col justify-center'>
        <p className='font-medium text-lg text-[#454545]'>바르고 고운말은 기본!</p>
        <p className='font-medium text-lg text-[#454545]'>예의없는 행동시 신고 대상이 됩니다.</p>
      </div>
    </div>
  );
};
