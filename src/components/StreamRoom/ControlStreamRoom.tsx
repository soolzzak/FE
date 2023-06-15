/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useAtom } from 'jotai';
import { useState } from 'react';
import { LuMic, LuMicOff } from 'react-icons/lu';
import { Exit } from '../../assets/svgs/Exit';
import { MonitorOff } from '../../assets/svgs/MonitorOff';
import { MonitorOn } from '../../assets/svgs/MonitorOn';
import { ScreenShare } from '../../assets/svgs/ScreenShare';
import { useModal } from '../../hooks/useModal';
import { isOpenLeaveRoomAtom } from '../../store/modalStore';
import { ConfigDropDown } from './ConfigDropDown';

export const ControlStreamRoom = ({micToggleHandler, videoToggleHandler, startScreenShare}: {micToggleHandler: () => void, videoToggleHandler: () => void, startScreenShare: () => void}) => {
  const [micOn, setMicOn] = useState<boolean>(true);
  const [monitorOn, setMonitorOn] = useState<boolean>(true);
  const [micHover, setMicHover] = useState(false);
  const [cameraHover, setCameraHover] = useState(false);
  const [screenHover, setScreenHover] = useState(false);
  const [settingHover, setSettingHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  const [isOpenLeaveRoom, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();

  return (
    <>
      <div
        role="none"
        onClick={micToggleHandler}
        onMouseOver={() => setMicHover(true)}
        onMouseOut={() => setMicHover(false)}
        className={`iconStyle ${micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'} `}
      >
        {micOn ? (
          <LuMic className="text-3xl text-white" />
        ) : (
          <LuMicOff className="text-3xl text-white" />
        )}
        {micHover ? (
          <div className="absolute -top-10 text-white px-3 py-1 z-auto bg-[#626262] rounded-md">
            Microphone
          </div>
        ) : null}
      </div>
      <div
        role="none"
        onClick={videoToggleHandler}
        onMouseOver={() => setCameraHover(true)}
        onMouseOut={() => setCameraHover(false)}
        className={`iconStyle ${
          monitorOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
        } relative`}
      >
        {monitorOn ? <MonitorOn /> : <MonitorOff />}
        {cameraHover ? (
          <div className="absolute -top-10 text-white px-3 py-1 z-auto bg-[#626262] rounded-md">
            Camera
          </div>
        ) : null}
      </div>

      <div
        role="none"
        onClick={startScreenShare}
        onMouseOver={() => setScreenHover(true)}
        onMouseOut={() => setScreenHover(false)}
        className="iconStyle relative bg-[#C0C0C0]"
      >
        <ScreenShare />
        {screenHover ? (
          <div className="w-32 absolute -top-10 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            Screen Share
          </div>
        ) : null}
      </div>

      <div
        onMouseOver={() => setSettingHover(true)}
        onMouseOut={() => setSettingHover(false)}
        className="iconStyle bg-[#C0C0C0]"
      >
        <ConfigDropDown setIsOpenKickout={setIsOpenKickout} />
        {settingHover ? (
          <div className="absolute -top-10 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            Setting
          </div>
        ) : null}
      </div>

      <div
        onMouseOver={() => setCloseHover(true)}
        onMouseOut={() => setCloseHover(false)}
      >
        <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
        {closeHover ? (
          <div className="absolute -top-10 right-0 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            Close
          </div>
        ) : null}
      </div>
    </>
  );
};
