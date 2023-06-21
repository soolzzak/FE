/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { LuMic, LuMicOff } from 'react-icons/lu';
import { Exit } from '../../assets/svgs/Exit';
import { MonitorOff } from '../../assets/svgs/MonitorOff';
import { MonitorOn } from '../../assets/svgs/MonitorOn';
import { ScreenShare } from '../../assets/svgs/ScreenShare';
import { useModal } from '../../hooks/useModal';
import { isOpenLeaveRoomAtom } from '../../store/modalStore';
import { hostIdAtom, micOnAtom, monitorOnAtom } from '../../store/streamControlStore';
import { ConfigDropDown } from './ConfigDropDown';

interface JwtPayload {
  auth: {
    email: string;
    id: string;
    role: string;
  };
  exp: string;
  iat: string;
  sub: string;
}

export const ControlStreamRoom = ({micToggleHandler, videoToggleHandler, startScreenShare}: {micToggleHandler: () => void, videoToggleHandler: () => void, startScreenShare: () => void}) => {
  const [micOn] = useAtom(micOnAtom)
  const [monitorOn] = useAtom(monitorOnAtom)
  const [micHover, setMicHover] = useState(false);
  const [cameraHover, setCameraHover] = useState(false);
  const [screenHover, setScreenHover] = useState(false);
  const [settingHover, setSettingHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  
  let userId: string | undefined = ""
  const getCookie = Cookies.get('accessKey');
  if (getCookie) {
    userId = jwtDecode<JwtPayload>(getCookie || '').auth.id;
  }

  const [, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();
  const [hostId] = useAtom(hostIdAtom);

  return (
    <>
      <div
        role="none"
        onClick={micToggleHandler}
        onMouseOver={() => setMicHover(true)}
        onMouseOut={() => setMicHover(false)}
        className={`iconStyle ${micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'} shadow`}
      >
        {micOn ? (
          <LuMic className="text-3xl text-white" />
        ) : (
          <LuMicOff className="text-3xl text-white" />
        )}
        {micHover ? (
          <div className="absolute bottom-28 text-white text-center px-2 py-1 z-auto bg-[#626262] rounded-md">
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
        } relative shadow`}
      >
        {monitorOn ? <MonitorOn /> : <MonitorOff />}
        {cameraHover ? (
          <div className="absolute -top-11 text-white text-center px-2 py-1 z-auto bg-[#626262] rounded-md">
            Camera
          </div>
        ) : null}
      </div>

      {/* <div
        role="none"
        onClick={startScreenShare}
        onMouseOver={() => setScreenHover(true)}
        onMouseOut={() => setScreenHover(false)}
        className="iconStyle relative bg-[#C0C0C0]"
      >
        <ScreenShare />
        {screenHover ? (
          <div className="w-32 absolute -top-10 text-white text-center px-2 py-1 z-auto bg-[#626262] rounded-md">
            Screen Share
          </div>
        ) : null}
      </div> */}

      {hostId === userId ? (
        <div
        onMouseOver={() => setSettingHover(true)}
        onMouseOut={() => setSettingHover(false)}
        className="iconStyle bg-[#C0C0C0] shadow"
      >
        <ConfigDropDown />
        {settingHover ? (
          <div className="absolute bottom-28 text-white text-center px-2 py-1 z-auto bg-[#626262] rounded-md">
            Setting
          </div>
        ) : null}
      </div>
      ) : null}
      

      <div
        onMouseOver={() => setCloseHover(true)}
        onMouseOut={() => setCloseHover(false)}
        className='shadow rounded-full'
      >
        <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
        {closeHover ? (
          <div className="absolute bottom-28 text-white text-center px-2 py-1 z-auto bg-[#626262] rounded-md">
            Close
          </div>
        ) : null}
      </div>
    </>
  );
};
