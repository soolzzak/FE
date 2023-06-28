/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { LuMic, LuMicOff } from 'react-icons/lu';
import { Exit } from '../../assets/svgs/Exit';
import { MonitorOff } from '../../assets/svgs/MonitorOff';
import { MonitorOn } from '../../assets/svgs/MonitorOn';
import { ScreenShare } from '../../assets/svgs/ScreenShare';
import { useModal } from '../../hooks/useModal';
import { isOpenLeaveRoomAtom } from '../../store/modalStore';
import {
  hostIdAtom,
  micOnAtom,
  monitorOnAtom,
  screenShareOnAtom,
} from '../../store/streamControlStore';
import { ConfigDropDown } from './ConfigDropDown';
import { userTokenAtom } from '../../store/mainpageStore';

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

export const ControlStreamRoom = ({
  micToggleHandler,
  videoToggleHandler,
  startScreenShare,
  isMyScreenShare,
  stopShare,
  gameHasStarted,
  youtubeIsOn,
}: {
  micToggleHandler: () => void;
  videoToggleHandler: () => void;
  startScreenShare: () => void;
  isMyScreenShare: boolean;
  stopShare: () => void;
  gameHasStarted: boolean;
  youtubeIsOn: boolean;
}) => {
  const [micOn] = useAtom(micOnAtom);
  const [monitorOn] = useAtom(monitorOnAtom);
  const [micHover, setMicHover] = useState(false);
  const [cameraHover, setCameraHover] = useState(false);
  const [screenHover, setScreenHover] = useState(false);
  const [settingHover, setSettingHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();
  const [hostId] = useAtom(hostIdAtom);
  const [userInfo] = useAtom(userTokenAtom);

  return (
    <>
      <div
        role="none"
        onClick={micToggleHandler}
        onMouseOver={() => setMicHover(true)}
        onMouseOut={() => setMicHover(false)}
        className={`iconStyle ${
          micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
        } shadow`}
      >
        {micOn ? (
          <LuMic className="text-3xl text-white" />
        ) : (
          <LuMicOff className="text-3xl text-white" />
        )}
        {micHover && micOn && (
          <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            마이크 끄기
          </div>
        )}
        {micHover && !micOn && (
          <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            마이크 켜기
          </div>
        )}
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
        {cameraHover && monitorOn && (
          <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            카메라 끄기
          </div>
        )}
        {cameraHover && !monitorOn && (
          <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            카메라 켜기
          </div>
        )}
      </div>

      {!gameHasStarted && !youtubeIsOn && (
        <div
          role="none"
          onClick={isMyScreenShare ? stopShare : startScreenShare}
          onMouseOver={() => setScreenHover(true)}
          onMouseOut={() => setScreenHover(false)}
          className={`iconStyle ${
            isMyScreenShare ? 'bg-[#808080]' : 'bg-[#C0C0C0]'
          } relative shadow`}
        >
          <ScreenShare />
          {screenHover && !isMyScreenShare && (
            <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
              화면공유 켜기
            </div>
          )}
          {screenHover && isMyScreenShare && (
            <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
              화면공유 끄기
            </div>
          )}
        </div>
      )}

      {hostId === userInfo?.id.toString() ? (
        <div
          onMouseOver={() => setSettingHover(true)}
          onMouseOut={() => setSettingHover(false)}
          className="iconStyle bg-[#C0C0C0] shadow"
        >
          <ConfigDropDown />
          {settingHover ? (
            <div className="min-w-max absolute -top-11 text-white text-center px-3 py-1 bg-[#626262] rounded-md">
              설정
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        onMouseOver={() => setCloseHover(true)}
        onMouseOut={() => setCloseHover(false)}
        className="shadow rounded-full relative"
      >
        <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
        {closeHover ? (
          <div className="min-w-max absolute bottom-[72px] -right-6 text-white text-center px-3 py-1 z-auto bg-[#626262] rounded-md">
            방에서 나가기
          </div>
        ) : null}
      </div>
    </>
  );
};
