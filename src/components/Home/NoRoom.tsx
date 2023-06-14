import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { NoroomBeer } from '../../assets/svgs/NoroomBeer';
import { NoroomSoju } from '../../assets/svgs/NoroomSoju';
import { NoroomWine } from '../../assets/svgs/NoroomWine';
import { isOpenAuthModalAtom } from '../../store/modalStore';
import { userTokenAtom } from '../../store/mainpageStore';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { AddRoom } from '../Header/AddRoom';

export const NoRoom = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isSojuVisible, setIsSojuVisible] = useState(false);
  const [isBeerVisible, setIsBeerVisible] = useState(false);
  const [isWineVisible, setIsWineVisible] = useState(false);

  const [, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [userToken] = useAtom(userTokenAtom);
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setIsSojuVisible(true);
    }, 0);

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

  const handleButtonClick = async () => {
    if (Object.keys(userToken as object).length === 0) {
      setIsOpenAuth(true);
      return;
    }

    setIsOpenRoomCreate(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row relative mt-10">
        {isSojuVisible && (
          <div className="absolute inset-y-0 left-80 ml-8">
            <NoroomSoju />
          </div>
        )}
        {isBeerVisible && (
          <div className="absolute inset-y-0 left-1/2 ml-16 top-1/2 mt-24 transform -translate-x-1/2 -translate-y-1/2">
            <NoroomBeer />
          </div>
        )}
        {isWineVisible && (
          <div className="absolute inset-y-0 top-72 transform left-96">
            <NoroomWine />
          </div>
        )}
      </div>

      <div className="absolute bottom-1/3">
        {isSojuVisible && isBeerVisible && isWineVisible && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-[40px] font-bold mb-2">
              아직 개설된 방이 없어요!
            </p>
            <p className="text-[32px] font-semibold text-[#646464]">
              혼술짝 방 만들고 가볍게 술 한잔 할까요?
            </p>
          </div>
        )}
        {isButtonVisible && (
          <button
            type="button"
            className="bg-[#179638] text-[#FFFFFF] rounded-lg w-[525px] h-[75px] mt-12 text-3xl font-bold"
            onClick={handleButtonClick}
          >
            혼술짝 방만들기
          </button>
        )}
      </div>
    </div>
  );
};
