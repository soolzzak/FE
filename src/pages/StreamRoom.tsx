/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { LuMic, LuMicOff, LuMonitor, LuMonitorOff } from 'react-icons/lu';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import { DetailUserProfile, getDetailUserProfile } from '../api/mypage';
import { Room, getRoom } from '../api/streamRoom';
import { Camera } from '../assets/svgs/Camera';
import { Exit } from '../assets/svgs/Exit';
import { Game } from '../assets/svgs/Game';
import { ToastIcon } from '../assets/svgs/ToastIcon';
import { Youtube } from '../assets/svgs/Youtube';
import { ConfigDropDown } from '../components/StreamRoom/ConfigDropDown';
import { KickoutModal } from '../components/StreamRoom/KickoutModal';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { RemoteUserSection } from '../components/StreamRoom/RemoteUserSection';
import { WaitingGuestRef } from '../components/StreamRoom/WaitingGuestRef';
import { Modal } from '../components/common/Modal';
import { useModal } from '../hooks/useModal';
import { isOpenLeaveRoomAtom } from '../store/modalStore';
import { MonitorOn } from '../assets/svgs/MonitorOn';
import { MonitorOff } from '../assets/svgs/MonitorOff';

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

let mediaStream: MediaStream;

export const StreamRoom = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const contentVideoRef = useRef<HTMLVideoElement>(null);
  const signalingServerUrl = 'wss://api.honsoolzzak.com/signal';
  const [roomInfo, setRoomInfo] = useState<Room>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [guestProfile, setGuestProfile] = useState<DetailUserProfile>();
  const [micOn, setMicOn] = useState<boolean>(true);
  const [monitorOn, setMonitorOn] = useState<boolean>(true);
  const [remoteMonitorOn, setRemoteMonitorOn] = useState<boolean>(false);
  const [guestIn, setGuestIn] = useState<boolean>(false);
  const [socketIsOnline, setSocketIsOnline] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket>(
    new WebSocket(signalingServerUrl)
  );

  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );

  const guestProfileMutation = useMutation(getDetailUserProfile, {
    onSuccess: (data) => {
      setGuestProfile(data?.data);
    },
    onError: (error) => {
      toast.error(error as ToastContent);
    },
  });

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
    mediaStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, mediaStream);
    });
  };
  const startLocalStream = async () => {
    try {
      // eslint-disable-next-line no-undef
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      console.log('this media stream', mediaStream);
    } catch (error) {
      console.log('Error accessing media devices:', error);
    }
  };

  useEffect(() => {
    const connectToSignalingServer = async () => {
      socket.onopen = () => {
        const message = JSON.stringify({
          from: userId,
          type: 'join',
          data: roomNum,
        });
        console.log('WebSocket connection opened', message);
        socket.send(message);
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
            break;
          case 'ice':
            guestProfileMutation.mutate(message.from);
            console.log('received ice message', message);
            await handleCandidateMessage(message);
            break;
          case 'join':
            console.log('received join message');
            setSocketIsOnline(true);
            message.data = await getRoom(params as string);
            setRoomInfo(message.data);
            console.log('get room? ', message.data);
            // setGuestIn(prev => true);
            await startLocalStream();
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
    if (audio) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn((prev) => !prev);
    }
  };

  const videoToggleHandler = () => {
    const video = localVideoRef.current;
    if (video) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setMonitorOn((prev) => !prev);
    }
  };
  const sendToastMessage = () => {
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'toast',
        data: roomNum,
      });
      console.log('toast sent', message);
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

  useEffect(() => {
    // shareView가 변경되면 localVideoRef에 스트림을 설정합니다.
    if (shareView && localVideoRef.current) {
      localVideoRef.current.srcObject = shareView;
    }
  }, [shareView]);

  const constraints = {
    video: {
      width: { ideal: 1980 },
      height: { ideal: 1080 },
      frameRate: 50,
      displaySurface: 'monitor', // 'monitor'를 지정하여 모니터 화면 공유 가능
    },
    audio: true,
  };

  // 화면 공유를 시작
  const startScreenShare = async () => {
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
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(mediaStream.getVideoTracks()[0]);
          }
        });
      });
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const [state, setState] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="f-col h-[85vh]">
        <div className="bg-red-200 border rounded-2xl f-col max-w-[1500px] w-full h-full mx-auto py-5 px-5 mt-32">
          <div className="flex flex-row-reverse w-full mb-5">
            <div className="flex items-center text-xl xl:text-[32px] font-semibold">
              {roomInfo?.title}
            </div>
            {guestProfile && (
              <RemoteUserSection
                guestProfile={guestProfile}
                guestProfileMutation={guestProfileMutation}
              />
            )}
          </div>

          <div className="grid sm:grid-cols-6 grid-cols-1 grid-rows-4 gap-4 w-full h-full">
            <div className="bg-red-300 col-span-4 row-span-3 h-full rounded-2xl">
              {guestIn ? (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  muted
                  className="bg-black w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <WaitingGuestRef />
              )}
            </div>

            <div className="bg-red-300 col-span-4 row-start-4">
              여기 버튼 4개
            </div>

            <div className="bg-red-300 col-span-2 row-span-2 h-full rounded-2xl">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            <div className="col-span-3 row-span-2 rounded-xl flex flex-col justify-between gap-4">
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <span className="w-48 h-full flex items-center xl:text-xl font-semibold gap-4">
                  <Camera />
                  함께 사진찍기
                </span>
              </div>
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <span className="w-48 h-full flex items-center xl:text-xl  font-semibold gap-4 ">
                  <Game />
                  게임하기
                </span>
              </div>
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <span className="w-48 h-full flex items-center xl:text-xl  font-semibold gap-4">
                  <Youtube />
                  유튜브 같이보기
                </span>
              </div>
              <button type="button" onClick={sendToastMessage}>
                Toast
              </button>
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

      <button type="button" onClick={startScreenShare}>
        화면공유
      </button>

      <video
        ref={contentVideoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
    // <div className="w-full">
    //   <div className="flex flex-col">
    //     <div className="bg-white border rounded-2xl flex flex-col w-full mt-32 max-w-[1400px] h-full mx-auto py-5 px-7">
    //       <div className="flex flex-row-reverse w-full justify-between mb-5">
    //         <div className="flex items-center text-xl xl:text-[32px] font-semibold">
    //           {roomInfo?.title}
    //         </div>
    //         {guestProfile && (
    //           <RemoteUserSection
    //             guestProfile={guestProfile}
    //             guestProfileMutation={guestProfileMutation}
    //           />
    //         )}
    //       </div>
    //       <div className="flex lg:flex-row flex-col justify-between gap-4 h-full">
    //         <div className="relative flex flex-col h-full justify-between w-full">
    //           {guestIn ? (
    //             <video
    //               ref={remoteVideoRef}
    //               autoPlay
    //               muted
    //               className="bg-black w-full h-full object-cover rounded-2xl"
    //             />
    //           ) : (
    //             <WaitingGuestRef />
    //           )}
    //           <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-primary-200 f-jic">
    //             <ToastIcon />
    //           </div>
    //           <div className="flex items-center justify-center gap-3 mt-4 py-2 rounded-2xl">
    //             <div
    //               role="none"
    //               onClick={micToggleHandler}
    //               className={`iconStyle ${
    //                 micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
    //               } `}
    //             >
    //               {micOn ? (
    //                 <LuMic className="text-3xl text-white" />
    //               ) : (
    //                 <LuMicOff className="text-3xl text-white" />
    //               )}
    //             </div>
    //             <div
    //               role="none"
    //               onClick={videoToggleHandler}
    //               onMouseOver={() => setState(true)}
    //               onMouseOut={() => setState(false)}
    //               className={`iconStyle ${
    //                 monitorOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
    //               } relative`}
    //             >
    //               {monitorOn ? <MonitorOn /> : <MonitorOff />}
    //               {state ? (
    //                 <div className="absolute -top-10 bg-[#00000080] rounded-md text-white px-3 py-1 z-auto">
    //                   Camera
    //                 </div>
    //               ) : null}
    //             </div>

    //             <div className="iconStyle bg-[#C0C0C0]">
    //               <ConfigDropDown setIsOpenKickout={setIsOpenKickout} />
    //             </div>

    //             <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
    //           </div>
    //         </div>

    //         <div className="flex flex-col gap-4">
    //           <div className="w-full h-full rounded-3xl">
    //             <video
    //               ref={localVideoRef}
    //               autoPlay
    //               muted
    //               className="w-full h-full object-cover rounded-3xl"
    //             />
    //           </div>
    //           <div className="rounded-xl flex flex-col justify-between gap-4 h-4/6">
    //             <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
    //               <span className="w-48 h-full flex items-center xl:text-xl font-semibold gap-4">
    //                 <Camera />
    //                 함께 사진찍기
    //               </span>
    //             </div>
    //             <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
    //               <span className="w-48 h-full flex items-center xl:text-xl font-semibold gap-4 ">
    //                 <Game />
    //                 게임하기
    //               </span>
    //             </div>
    //             <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
    //               <span className="w-48 h-full flex items-center xl:text-xl font-semibold gap-4">
    //                 <Youtube />
    //                 유튜브 같이보기
    //               </span>
    //             </div>
    //             <button type="button" onClick={startScreenShare}>
    //               화면공유
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Modal
    //     isOpen={isOpenLeaveRoom}
    //     onClose={() => setIsOpenLeaveRoom(false)}
    //     hasOverlay
    //   >
    //     <LeaveRoomModal />
    //   </Modal>

    //   <Modal isOpen={isOpenKickout} onClose={onCloseKickout}>
    //     <KickoutModal onClose={onCloseKickout} />
    //   </Modal>
    //   <button type="button" onClick={sendToastMessage}>
    //     Toast
    //   </button>
    // </div>
  );
};
