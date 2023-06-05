import React, { useState } from 'react';
import { Report } from '../assets/svgs/Report';
// import { useRef } from 'react';
// import { useEffect } from 'react';
// import { ReactComponent as Water } from '../assets/svgs/Water';

// import Cookies from 'js-cookie';
// import jwtDecode from 'jwt-decode';
// import { getRoom } from '../api/streamRoom';

import { Thumbdown } from '../assets/svgs/Thumbdown';
import { Thumbup } from '../assets/svgs/Thumbup';
import { ReportModal } from '../report/ReportModal';
import { useModal } from '../hooks/useModal';
import { Modal } from '../components/common/Modal';
import { JoinGuestModal } from '../components/StreamRoom/JoinGuestModal';
import { Mic } from '../assets/svgs/Mic';
import { Setting } from '../assets/svgs/Setting';
import { Dooropen } from '../assets/svgs/Dooropen';
import { Camera } from '../assets/svgs/Camera';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { CategoryDropDown } from '../components/StreamRoom/CategoryDropDown';
import { ConfigDropDown } from '../components/StreamRoom/ConfigDropDown';
import { KickoutModal } from '../components/StreamRoom/KickoutModal';

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

  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();

  const handleClick = () => {
    setIsFilled(true);
  };

  const [isOpenReport, onCloseReport, setIsOpenReport] = useModal();
  const [isOpenJoinPartner, onCloseJoinPartner, setIsOpenJoinPartner] =
    useModal();
  const [isOpenLeaveRoom, onCloseLeaveRoom, setIsOpenLeaveRoom] = useModal();

  return (
    <div className="flex flex-col h-screen rounded-3xl bg-[#cdcdcd]">
      <div className="basis-1/12 flex justify-between mt-20 p-5 m-5">
        <div className="flex flex-row items-center">
          {/* <div className="w-16 h-16 rounded-full bg-[#9A9A9A] mr-4"  /> */}
          <CategoryDropDown />
          <p className="text-[20px] font-semibold mr-4">
            카리나님과 따로 또 같이 혼술하는 중!
          </p>

          <div className="flex flex-row gap-4 ">
            <Thumbdown />
            <Thumbup />
            <Report setIsOpenReport={setIsOpenReport} />
          </div>
        </div>
        <p className="font-semibold text-[32px]">얘기하면서 같이 소주마셔요!</p>
      </div>
      <div className="basis-11/12 grid grid-cols-5 grid-rows-6 gap-5">
        <div className="relative col-span-3 row-span-6 bg-[#eae8e8]">
          <div className="absolute top-0">상대방</div>
          <div className="absolute bottom-10 flex flex-row gap-4 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-[#959595] w-20 h-20 flex justify-center items-center hover:cursor-pointer">
              <Mic />
            </div>

            <div className="rounded-full bg-[#959595] w-20 h-20 flex justify-center items-center hover:cursor-pointer">
              <Camera />
            </div>

            <ConfigDropDown setIsOpenKickout={setIsOpenKickout} />

            <div
              role="none"
              className="rounded-full bg-[#F90707] w-20 h-20 flex justify-center items-center hover:cursor-pointer"
              onClick={() => setIsOpenLeaveRoom(true)}
            >
              <Dooropen />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-3 bg-[#eae8e8]">나</div>
        <div className="col-span-2 row-span-2 bg-[#eae8e8]">채팅</div>
        <div className="col-span-2 row-span-1 bg-[#eae8e8]">텍스트보내기</div>
      </div>

      <Modal isOpen={isOpenReport} onClose={onCloseReport}>
        <ReportModal onCloseReport={onCloseReport} />
      </Modal>

      <Modal isOpen={isOpenJoinPartner} onClose={onCloseJoinPartner}>
        <JoinGuestModal onClose={onCloseJoinPartner} />
      </Modal>

      <Modal isOpen={isOpenLeaveRoom} onClose={onCloseLeaveRoom}>
        <LeaveRoomModal onCloseLeaveRoom={onCloseLeaveRoom} />
      </Modal>

      <Modal isOpen={isOpenKickout} onClose={onCloseKickout}>
        <KickoutModal onClose={onCloseKickout} />
      </Modal>

      <button type="button" onClick={() => setIsOpenJoinPartner(true)}>
        상대방 입장 임시버튼
      </button>
    </div>
  );
};
