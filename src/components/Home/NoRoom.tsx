import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { NoroomBeer } from '../../assets/svgs/NoroomBeer';
import { NoroomSoju } from '../../assets/svgs/NoroomSoju';
import { NoroomWine } from '../../assets/svgs/NoroomWine';
import { useModal } from '../../hooks/useModal';
import { userTokenAtom } from '../../store/mainpageStore';
import { isOpenAuthModalAtom } from '../../store/modalStore';
import { AddRoom } from '../Header/AddRoom';
import { Modal } from '../common/Modal';

export const NoRoom = () => {
  // const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isSojuVisible, setIsSojuVisible] = useState(false);
  const [isBeerVisible, setIsBeerVisible] = useState(false);
  const [isWineVisible, setIsWineVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const [, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [userToken] = useAtom(userTokenAtom);
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();

  const item = {
    hidden: { opacity: 0, y: 100, transition: { duration: 0.5 } },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

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
      setIsContentVisible(true);
    }, 1500);

    // const timeout5 = setTimeout(() => {
    //   setIsButtonVisible(true);
    // }, 2000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      // clearTimeout(timeout5);
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
    <div className="f-jic-col w-full h-full relative items-center justify-center max-w-[800px]">
      <div className="flex flex-row w-full max-w-[800px] absolute top-0 ">
        {isSojuVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={item}
            className="absolute md:left-40 left-36 transform -translate-x-1/2 -translate-y-1/2"
          >
            <NoroomSoju />
          </motion.div>
        )}
        {isBeerVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={item}
            className="absolute left-1/3 ml-20 top-1/2 mt-28 transform -translate-x-1/2 -translate-y-1/2"
          >
            <NoroomBeer />
          </motion.div>
        )}
        {isWineVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={item}
            className="absolute top-80 transform -translate-x-1/2 -translate-y-1/2 md:left-1/4 left-48"
          >
            <NoroomWine />
          </motion.div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center absolute top-96 mt-24 md:mt-24">
        {isContentVisible && (
          <motion.div initial="hidden" animate="visible" variants={item}>
            <div className="flex flex-col justify-center items-center">
              <p className="md:text-[40px] text-[32px] font-bold">
                아직 개설된 방이 없어요!
              </p>
              <p className="md:text-[32px] text-[24px] font-semibold  text-[#646464]">
                혼술짝 방 만들고 가볍게 술 한잔 할까요?
              </p>

              <button
                type="button"
                className="bg-primary-300 hover:bg-primary-400 transition duration-300 text-[#FFFFFF] rounded-xl md:w-[525px] md:h-[75px] w-[320px] h-[60px] mt-12 md:text-3xl text-xl font-bold"
                onClick={handleButtonClick}
              >
                혼술짝 방만들기
              </button>
            </div>
          </motion.div>
        )}

        <Modal isOpen={isOpenRoomCreate} onClose={onCloseRoomCreate} hasOverlay>
          <AddRoom onClose={onCloseRoomCreate} />
        </Modal>
      </div>
    </div>
  );
};
