import { useEffect, useState, useRef } from 'react';
import { NoroomSoju } from '../../assets/svgs/NoroomSoju';
import { NoroomBeer } from '../../assets/svgs/NoroomBeer';
import { NoroomWine } from '../../assets/svgs/NoroomWine';

export const NoRoom = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isSojuVisible, setIsSojuVisible] = useState(false);
  const [isBeerVisible, setIsBeerVisible] = useState(false);
  const [isWineVisible, setIsWineVisible] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setIsSojuVisible(true);
    }, 0); // 바로 나타나도록 변경

    const timeout2 = setTimeout(() => {
      setIsBeerVisible(true);
    }, 500);

    const timeout3 = setTimeout(() => {
      setIsWineVisible(true);
    }, 1000);

    const timeout4 = setTimeout(() => {
      setIsButtonVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);

  return (
    <div className=" w-full h-[1000px] flex flex-col items-center justify-center">
      <div>
        {isSojuVisible && (
          <div className="mr-64 mt-8 mb-8">
            <NoroomSoju />
          </div>
        )}
        {isBeerVisible && (
          <div className="ml-8 mb-24">
            <NoroomBeer />
          </div>
        )}
        {isWineVisible && (
          <div className="mr-60 mb-16">
            <NoroomWine />
          </div>
        )}
      </div>
      {isSojuVisible && isBeerVisible && isWineVisible && (
        <div className="flex flex-col justify-center items-center mt-12">
          <p className="text-[40px] font-bold mb-2">아직 개설된 방이 없어요!</p>
          <p className="text-[32px] font-semibold text-[#646464]">
            혼술짝 방 만들고 가볍게 술 한잔 할까요?
          </p>
        </div>
      )}
      {isButtonVisible && (
        <button
          type="button"
          className="bg-[#179638] text-[#FFFFFF] rounded-lg w-[525px] h-[75px] mt-12 text-3xl font-bold"
        >
          혼술짝 방만들기
        </button>
      )}
    </div>
  );
};
