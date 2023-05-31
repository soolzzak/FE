import React, { useState } from 'react';
import { Report } from '../assets/svgs/Report';
// import { useRef } from 'react';
// import { useEffect } from 'react';
// import { ReactComponent as Water } from '../assets/svgs/Water';

import { Thumbdown } from '../assets/svgs/Thumbdown';
import { Thumbup } from '../assets/svgs/Thumbup';
import { ReportModal } from '../report/ReportModal';
import { useModal } from '../hooks/useModal';
import { Modal } from '../components/common/Modal';
import { JoinPartnerModal } from '../components/StreamRoom/JoinPartnerModal';
import { JoinHostModal } from '../components/StreamRoom/JoinHostModal';

export const StreamRoom = () => {
  // const { data, isLoading, isError, error } = useQuery('roomInfo', getRoom);

  // const [roominfo, setRoominfo] = useState<Room | null>(null);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>{(error as Error).message}</div>;

  // if (true) {
  // } else {
  // }
  // useEffect(() => {
  //   if (data) {
  //     setRoominfo(data);
  //     console.log(data);
  //   }
  // }, [data]);
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(true);
  };

  const [isOpen, onClose, setIsOpen] = useModal();
  const [joinHostOpen, onJoinHostClose, setJoinHoseOpen] = useModal();
  const [welcomeOpen, welcomeClose, setWelcomeOpen] = useModal();

  const closeWelcome = () => {
    welcomeClose();
  };

  return (
    <div className="flex flex-col h-screen p-5 m-5 rounded-3xl bg-[#cdcdcd]">
      <div className="basis-1/12 flex justify-between p-4">
        <div className="flex flex-row items-center">
          <div className="w-16 h-16 rounded-full bg-[#9A9A9A] mr-4" />
          <p className="text-[20px] font-semibold mr-4">
            카리나님과 따로 또 같이 혼술하는 중!
          </p>

          <div className="flex flex-row gap-4 ">
            <Thumbdown />
            <Thumbup />
            <Report setIsOpen={setIsOpen} />
          </div>
        </div>
        <p className="font-semibold text-[32px]">얘기하면서 같이 소주마셔요!</p>
      </div>
      <div className="basis-11/12 grid grid-cols-5 grid-rows-6 gap-5">
        <div className="col-span-3 row-span-6 bg-[#eae8e8]">상대방</div>
        <div className="col-span-2 row-span-3 bg-[#eae8e8]">나</div>
        <div className="col-span-2 row-span-2 bg-[#eae8e8]">채팅</div>
        <div className="col-span-2 row-span-1 bg-[#eae8e8]">텍스트보내기</div>
      </div>

      {/* <Modal isOpen={isOpen} onClose={onClose} >
    <ReportModal />
    </Modal> */}

      {/* <Modal isOpen={joinHostOpen} onClose={onJoinHostClose}>
    <JoinHostModal onClose={onJoinHostClose}/>
    </Modal> */}

      {/* <Modal isOpen={welcomeOpen} onClose={welcomeClose} >
    <JoinPartnerModal onClose={closeWelcome}/>
    </Modal> */}

      <button type="button" onClick={() => setWelcomeOpen(true)}>
        임시버튼~_~
      </button>
    </div>
  );
};
