/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { LuMic, LuMicOff } from 'react-icons/lu';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import { Toast } from '../components/StreamRoom/Toast';
import { DetailUserProfile, getDetailUserProfile } from '../api/mypage';
import { Room, getRoom } from '../api/streamRoom';
import { Camera } from '../assets/svgs/Camera';
import { Exit } from '../assets/svgs/Exit';
import { Game } from '../assets/svgs/Game';
import { MonitorOff } from '../assets/svgs/MonitorOff';
import { MonitorOn } from '../assets/svgs/MonitorOn';
import { Youtube } from '../assets/svgs/Youtube';
import { ConfigDropDown } from '../components/StreamRoom/ConfigDropDown';
import { KickoutModal } from '../components/StreamRoom/KickoutModal';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { RemoteUserSection } from '../components/StreamRoom/RemoteUserSection';
import { WaitingGuestRef } from '../components/StreamRoom/WaitingGuestRef';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';

import {
  isOpenLeaveRoomAtom,
  isOpenModifyRoomAtom,
  toastAtom,
} from '../store/modalStore';
import { ScreenShare } from '../assets/svgs/ScreenShare';
import { ToastIcon } from '../assets/svgs/ToastIcon';
import { ModifyRoomModal } from '../components/StreamRoom/ModifyRoomModal';
import { roomPasswordAtom, streamRoomInfoAtom } from '../store/addRoomStore';
import { ControlStreamRoom } from '../components/StreamRoom/ControlStreamRoom';

export interface JwtPayload {
  auth: {
    email: string;
    id: string;
    role: string;
  };
  exp: string;
  iat: string;
  sub: string;
}

interface RTCSessionMessage {
  sdp: RTCSessionDescription;
}

interface RTCIceMessage {
  candidate: RTCIceCandidate;
}

const PeerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
  ],
};

// let mediaStream: MediaStream;

export const StreamRoom = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const contentVideoRef = useRef<HTMLVideoElement>(null);
  const signalingServerUrl = 'wss://api.honsoolzzak.com/signal';
  const [roomPassword] = useAtom(roomPasswordAtom);
  const [roomInfo, setRoomInfo] = useAtom(streamRoomInfoAtom);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [socket, setSocket] = useState<WebSocket>(
    new WebSocket(signalingServerUrl)
  );
  const [guestProfile, setGuestProfile] = useState<DetailUserProfile>();
  const [micOn, setMicOn] = useState<boolean>(true);
  const [monitorOn, setMonitorOn] = useState<boolean>(true);
  const [remoteMonitorOn, setRemoteMonitorOn] = useState<boolean>(false);
  const [guestIn, setGuestIn] = useState<boolean>(false);
  const [socketIsOnline, setSocketIsOnline] = useState<boolean>(false);

  let mediaStream: MediaStream;
  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [micHover, setMicHover] = useState(false);
  const [cameraHover, setCameraHover] = useState(false);
  const [screenHover, setScreenHover] = useState(false);
  const [settingHover, setSettingHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [toastHover, setToastHover] = useState(false);
  const [modifyRoomIsOpen, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);

  const guestProfileMutation = useMutation(getDetailUserProfile, {
    onSuccess: (data) => {
      setGuestProfile(data?.data);
    },
    onError: (error) => {
      toast.error(error as ToastContent);
    },
  });
  const [showToast, setShowToast] = useAtom(toastAtom);

  const showToastHandler = async () => {
    setShowToast(() => true);
    setTimeout(() => {
      setShowToast(() => false);
    }, 3700);
  };
  const [isOpenLeaveRoom, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);
  const [isOpenKickout, onCloseKickout, setIsOpenKickout] = useModal();

  const getCookie = Cookies.get('refreshKey');
  const params = useParams().id;

  let userId: string;
  if (getCookie) {
    userId = jwtDecode<JwtPayload>(getCookie || '').auth.id;
  }

  const roomNum = params;

  const handleOfferMessage = async (message: RTCSessionMessage) => {
    console.log('accepting offer', message);
    const answerSDP = new RTCSessionDescription(message.sdp);
    setGuestIn(true);
    try {
      console.log('setRemoteDescription', message.sdp);
      await peerConnection.setRemoteDescription(answerSDP);
      const answer = await peerConnection.createAnswer();
      console.log('setLocalDescription', answer);
      await peerConnection.setLocalDescription(answer);

      const response = {
        from: userId,
        data: Number(roomNum),
        type: 'answer',
        sdp: peerConnection.localDescription,
      };

      console.log('sending sdp', peerConnection.localDescription);
      console.log('added answer to peerConnection', peerConnection);
      console.log('sending answer to received offer', response);
      socket.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswerMessage = async (message: RTCSessionMessage) => {
    console.log('have received answer', message.sdp);
    console.log(
      'using received answer for Remote peer description',
      peerConnection
    );
    try {
      console.log('setRemotelDescription', message.sdp);
      await peerConnection.setRemoteDescription(message.sdp);
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleCandidateMessage = async (message: RTCIceMessage) => {
    try {
      await peerConnection.addIceCandidate(message.candidate);
    } catch (error) {
      console.error('Error handling candidate:', error);
    }
  };

  const startCall = async () => {
    try {
      console.log('sending offer using peer: ', peerConnection);
      const offer = await peerConnection.createOffer();
      console.log('setLocalDescription', offer);
      await peerConnection.setLocalDescription(offer);

      const message = {
        from: userId,
        type: 'offer',
        data: Number(roomNum),
        sdp: peerConnection.localDescription,
      };
      console.log('sending sdp', peerConnection.localDescription);
      console.log('sending offer', message);
      socket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const createPeerConnection = async () => {
    console.log('created peer connection: ', peerConnection);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to the remote peer via signaling channel
        console.log('sending ice candidate', event.candidate);
        const message = {
          from: userId,
          data: Number(roomNum),
          type: 'ice',
          candidate: event.candidate,
        };
        socket.send(JSON.stringify(message));
      }
    };
    peerConnection.ontrack = (event) => {
      // Add remote stream to the video element
      setRemoteMonitorOn(() => true);
      console.log('응', peerConnection.getSenders());

      console.log('got remote stream', event.streams[0]);
      const stream = event.streams[0];
      if (remoteVideoRef.current) {
        console.log('adding remote stream to video element');
        remoteVideoRef.current.srcObject = stream;
        console.log('stream?', stream);
      }
      console.log('remote ref', remoteVideoRef.current);
      console.log(
        'remoteVideoRef.current.srcObject',
        remoteVideoRef.current?.srcObject
      );
    };
    peerConnection.oniceconnectionstatechange = () => {
      console.log('opposing user disconnect event');
      if (
        peerConnection.iceConnectionState === 'disconnected' ||
        peerConnection.iceConnectionState === 'closed'
      ) {
        console.log('Opposing peer disconnected');
        if (remoteVideoRef.current) {
          if (remoteVideoRef.current.srcObject) {
            const stream = remoteVideoRef.current.srcObject as MediaStream;
            // stream.getTracks().forEach((track) => track.stop());
          }
          remoteVideoRef.current.srcObject = null;
        }
        console.log(
          'remoteVideoRef.current.srcObject',
          remoteVideoRef.current?.srcObject
        );
        setRemoteMonitorOn(() => false);
        setGuestIn(() => false);
        setGuestProfile(() => undefined);
        console.log('peerConnection', peerConnection);
      }
    };

    console.log('adding media stream to track', mediaStream);
    mediaStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, mediaStream);
    });
  };
  const startLocalStream = async () => {
    try {
      // eslint-disable-next-line no-undef
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log('stream담기나?', stream);
      mediaStream = stream;
      setMyMediaStream(() => stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      console.log('this media stream', mediaStream);
    } catch (error) {
      console.log('Error accessing media devices:', error);
    }
  };

  const sendJoinMessage = () => {
    const message = JSON.stringify({
      from: userId,
      type: 'join',
      data: roomNum,
    });
    socket.send(message);
    console.log('send join message');
  };

  useEffect(() => {
    const connectToSignalingServer = async () => {
      socket.onopen = () => {
        console.log('WebSocket connection opened');
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'info':
            console.log('received info message', message);
            await startLocalStream();
            await sendJoinMessage();
            break;
          case 'offer':
            console.log('received offer message', message);
            await handleOfferMessage(message);
            break;
          case 'answer':
            console.log('received answer message', message);
            setGuestIn(() => true);
            await handleAnswerMessage(message);
            break;
          case 'toast':
            console.log('received toast message', message);
            showToastHandler();
            break;
          case 'ice':
            guestProfileMutation.mutate(message.from);
            console.log('received ice message', message);
            await handleCandidateMessage(message);
            break;
          case 'join':
            console.log('received join message');
            setSocketIsOnline(true);
            message.data = await getRoom(params as string, roomPassword);
            setRoomInfo(message.data);
            console.log('get room? ', message.data);
            // setGuestIn(prev => true);
            await createPeerConnection();
            // console.log(message.data.data.hostId);
            if (message.data?.hostId !== userId) {
              console.log('starting call');
              await startCall();
            }

            break;
          default:
            console.warn('Invalid message type:', message.type);
        }
      };
    };

    // Establish a connection with the signaling server
    connectToSignalingServer();
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const micToggleHandler = () => {
    const audio = localVideoRef.current;
    if (audio && myMediaStream) {
      const audioTrack = myMediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn((prev) => !prev);
    }
  };

  const videoToggleHandler = () => {
    const video = localVideoRef.current;
    if (video && myMediaStream) {
      const videoTrack = myMediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setMonitorOn((prev) => !prev);
    }
  };
  const sendToastMessage = () => {
    console.log('click toast');
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'toast',
        data: roomNum,
      });
      console.log('toast sent', message);
      showToastHandler();
      socket.send(message);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (socket) {
      console.log('timer started');
      intervalId = setInterval(() => {
        const message = JSON.stringify({
          from: userId,
          type: 'ping',
          data: roomNum,
        });
        console.log('sending ping', message);
        socket.send(message);
      }, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [socketIsOnline]);

  useEffect(() => {
    if (guestIn) console.log('remote ref2', remoteVideoRef);
  }, [guestIn]);

  // const sendToastMessage = () => {
  //   const message = JSON.stringify({
  //     from: userId,
  //     type: 'toast',
  //     data: roomNum,
  //   });
  //   console.log('toast sent', message);
  //   socket.send(message);

  // 화면공유
  const [shareView, setShareView] = useState<MediaStream | null>(null); // 화면 공유 스트림 상태 추가
  console.log('shareView', shareView);

  useEffect(() => {
    // shareView가 변경되면 localVideoRef에 스트림을 설정합니다.
    if (shareView && localVideoRef.current) {
      localVideoRef.current.srcObject = shareView;
    } else if (localVideoRef.current) {
      localVideoRef.current.srcObject = myMediaStream;
      console.log('다시주입되니', myMediaStream);
    }
    if (shareView) {
      shareView.onremovetrack = () => {
        console.log('removeTrack');
      };
    }
  }, [shareView]);

  const constraints = {
    video: {
      width: { ideal: 1980 },
      height: { ideal: 1080 },
      frameRate: 50,
      displaySurface: 'monitor', // 'monitor'를 지정하여 모니터 화면 공유 가능
    },
    audio: false,
  };

  // 화면 공유를 시작
  const startScreenShare = async () => {
    console.log('mediaStream start', myMediaStream);
    console.log('히히', peerConnection.getSenders());
    try {
      if (!navigator.mediaDevices.getDisplayMedia) {
        throw new Error('Screen sharing is not supported.');
      }

      // 화면 공유 스트림 가져오기
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      setShareView(stream); // 화면 공유 스트림 상태 업데이트

      // 화면 공유 스트림으로 트랙 교체
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          console.log('화면공유스트림', stream);
          sender.replaceTrack(stream.getVideoTracks()[0]);
          console.log('겟비디오', stream.getVideoTracks());
        }
      });

      console.log('트랙교체', peerConnection.getSenders());

      // 화면 공유 스트림 종료
      console.log('sender stream', stream);
      stream.getVideoTracks()[0].onended = () => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = myMediaStream;
          console.log('mediastream 바꾸자0', myMediaStream);
        }
        console.log('mediastream 바꾸자1', myMediaStream);
        peerConnection.getSenders().forEach((sender) => {
          console.log('mediastream 바꾸자2', myMediaStream);
          if (sender.track?.kind === 'video' && myMediaStream) {
            console.log('mediastream 바꾸자3', myMediaStream);
            sender.replaceTrack(myMediaStream.getVideoTracks()[0]);
            console.log('if mediaStream', myMediaStream);
          }
        });
      };
      // stream.getVideoTracks()[0].addEventListener('ended', () => {
      //   peerConnection.getSenders().forEach((sender) => {
      //     if (sender.track?.kind === 'video' && mediaStream) {
      //       sender.replaceTrack(mediaStream.getVideoTracks()[0]);
      //     }
      //   });
      // });
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  return (
    <div className="w-full h-full min-w-[660px]">
      {showToast && <Toast />}

      <div className="f-col pt-20">
        <div className="border rounded-2xl f-col max-w-[1500px] w-full h-full mx-auto py-5 px-5">
          <div className="flex flex-row-reverse w-full h-16  mb-5 justify-between">
            <div className="flex items-centertext-xl text-[32px] font-semibold pr-1">
              {roomInfo?.title}
            </div>
            {guestProfile && (
              <RemoteUserSection
                guestProfile={guestProfile}
                guestProfileMutation={guestProfileMutation}
              />
            )}
          </div>

          <div className="grid xl:grid-cols-6 grid-cols-1 xl:grid-rows-6 grid-rows-4 gap-4 w-full h-full">
            <div className="relative xl:col-span-4 xl:row-span-6 row-span-3 w-full h-full rounded-2xl">
              <div
                role="none"
                onClick={sendToastMessage}
                onMouseOver={() => setToastHover(true)}
                onMouseOut={() => setToastHover(false)}
                className="w-14 h-14 f-jic absolute xl:right-5 top-5 ml-5 rounded-full bg-primary-300 hover:cursor-pointer z-10"
              >
                <ToastIcon />
                {toastHover ? (
                  <div className="absolute w-48 h-10 top-16 xl:right-0 ml-36 bg-white text-lg font-semibold rounded-xl f-jic">
                    건배할 때 눌러보세요!
                  </div>
                ) : null}
              </div>
              <div className="w-full h-full rounded-2xl">
                {guestIn ? (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="bg-black w-full h-full xl:max-h-[730px] max-h-[500px] object-contain rounded-2xl"
                  />
                ) : (
                  <WaitingGuestRef />
                )}
              </div>

              <div className="flex gap-3 absolute left-1/2 -translate-x-1/2 bottom-5">
                {/* <div
                  role="none"
                  onClick={micToggleHandler}
                  onMouseOver={() => setMicHover(true)}
                  onMouseOut={() => setMicHover(false)}
                  className={`iconStyle ${
                    micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
                  } `}
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
                </div> */}
                <ControlStreamRoom micToggleHandler={micToggleHandler} videoToggleHandler={videoToggleHandler} startScreenShare={startScreenShare}/>
              </div>
            </div>

            <div className="xl:relative xl:col-span-2 xl:row-span-3 rounded-2xl xl:w-full xl:h-full xl:right-0 xl:top-0 absolute min-w-[300px] w-[30%] h-auto right-10 top-52">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full xl:max-h-96 max-h-56 object-contain rounded-2xl"
              />
            </div>

            <div className="xl:col-span-2 xl:row-span-3 row-start-4 f-col gap-4 w-full">
              <div className="border border-[#D9D9D9] h-1/3 f-jic xl:text-xl font-semibold gap-4 rounded-2xl">
                <Camera />
                함께 사진찍기
              </div>
              <div className="border border-[#D9D9D9] h-1/3 f-jic xl:text-xl font-semibold gap-4 rounded-2xl">
                <Game />
                게임하기
              </div>
              <div className="border border-[#D9D9D9] h-1/3 f-jic xl:text-xl font-semibold gap-4 rounded-2xl">
                <Youtube />
                유튜브 같이보기
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenLeaveRoom}
        onClose={() => setIsOpenLeaveRoom(false)}
        hasOverlay
      >
        <LeaveRoomModal />
      </Modal>

      <Modal isOpen={isOpenKickout} onClose={onCloseKickout}>
        <KickoutModal onClose={onCloseKickout} />
      </Modal>

      <Modal
        isOpen={modifyRoomIsOpen}
        onClose={() => setModiftRoomIsOpen(false)}
        hasOverlay
      >
        <ModifyRoomModal />
      </Modal>

      {/* <video
        ref={contentVideoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-3xl"
      /> */}
    </div>
  );
};
