/* eslint-disable jsx-a11y/media-has-caption */
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LuMic, LuMicOff, LuMonitor, LuMonitorOff } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { ToastContent, toast } from 'react-toastify';
import { Room, getRoom } from '../api/streamRoom';
import { Camera } from '../assets/svgs/Camera';
import { Exit } from '../assets/svgs/Exit';
import { Game } from '../assets/svgs/Game';
import { Setting } from '../assets/svgs/Setting';
import { Youtube } from '../assets/svgs/Youtube';
import { CategoryDropDown } from '../components/StreamRoom/CategoryDropDown';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { Modal } from '../components/common/Modal';
import { isOpenLeaveRoomAtom } from '../store/modalStore';
import { DetailUserProfile, getDetailUserProfile } from '../api/mypage';
import { RemoteUserSection } from '../components/StreamRoom/RemoteUserSection';

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

  const [roomInfo, setRoomInfo] = useState<Room>();
  const [guestProfile, setGuestProfile] = useState<DetailUserProfile>();
  const [micOn, setMicOn] = useState<boolean>(true);
  const [monitorOn, setMonitorOn] = useState<boolean>(true);

  const guestProfileMutation = useMutation(getDetailUserProfile, {
    onSuccess: (data) => {
      setGuestProfile(data?.data);
    },
    onError: (error) => {
      toast.error(error as ToastContent);
    },
  });

  const [isOpenLeaveRoom, setIsOpenLeaveRoom] = useAtom(isOpenLeaveRoomAtom);

  const getCookie = Cookies.get('accessKey');
  const params = useParams().id;

  const userId = jwtDecode<JwtPayload>(getCookie || '').auth.id;
  const roomNum = params;

  let socket: WebSocket;
  let peerConnection: RTCPeerConnection;

  const handleOfferMessage = async (message: RTCSessionMessage) => {
    console.log('accepting offer', message);
    const answerSDP = new RTCSessionDescription(message.sdp);
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
    peerConnection = new RTCPeerConnection(PeerConnectionConfig);
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
      console.log('got remote stream', event.streams[0]);
      const stream = event.streams[0];
      if (remoteVideoRef.current) {
        console.log('adding remote stream to video element');
        remoteVideoRef.current.srcObject = stream;
      }
      console.log('remote ref', remoteVideoRef.current);
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
    

    const signalingServerUrl = 'wss://api.honsoolzzak.com/signal';
    socket = new WebSocket(signalingServerUrl);

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
            guestProfileMutation.mutate(message.from);
            await handleOfferMessage(message);
            break;
          case 'answer':
            console.log('received answer message', message);
            await handleAnswerMessage(message);
            break;
          case 'ice':
            console.log('received ice message', message);
            await handleCandidateMessage(message);
            break;
          case 'join':
            console.log('received join message');

            message.data = await getRoom(params as string);
            setRoomInfo(message.data);
            console.log('get room? ', message.data);

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
      audio.muted = !audio.muted;
      setMicOn((prev) => !prev);
    }
  };

  const videoToggleHandler = () => {
    const video = localVideoRef.current;
    if (video) {
      mediaStream.getVideoTracks().forEach((track) => ({
        ...track,
        enabled: !track.enabled,
      }));
      setMonitorOn((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col rounded-3xl p-5">
      <div className="bg-white mt-20 mx-10 py-8 px-16 rounded-3xl">
        <div className="flex justify-center">
          <div className="flex flex-row w-full justify-between mb-5">
            {guestProfile && (
              <RemoteUserSection
                guestProfile={guestProfile}
                guestProfileMutation={guestProfileMutation}
              />
            )}
            <div className="flex items-center xl:text-3xl font-semibold">
              {roomInfo?.title}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="gap-5 grid grid-cols-9 grid-rows-6 h-[80vh] w-full">
            <div className="col-span-6 row-span-6 flex flex-col justify-between gap-5">
              <video
                ref={localVideoRef}
                autoPlay
                className="bg-black w-full h-5/6 object-cover rounded-xl"
              />
              <div className="bg-slate-200 h-1/6 flex items-center justify-center gap-6 rounded-xl">
                <div
                  role="none"
                  onClick={micToggleHandler}
                  className={`iconStyle ${
                    micOn ? 'bg-[#727272]' : 'bg-[#525252]'
                  } `}
                >
                  {micOn ? (
                    <LuMic className="text-4xl text-white" />
                  ) : (
                    <LuMicOff className="text-4xl text-white" />
                  )}
                </div>
                <div
                  role="none"
                  onClick={videoToggleHandler}
                  className={`iconStyle ${
                    monitorOn ? 'bg-[#727272]' : 'bg-[#525252]'
                  } `}
                >
                  {monitorOn ? (
                    <LuMonitor className="text-4xl text-white" />
                  ) : (
                    <LuMonitorOff className="text-4xl text-white" />
                  )}
                </div>

                <div className="iconStyle bg-[#727272]">
                  <AiOutlineSetting className="text-5xl text-white hover:animate-spin" />
                </div>

                <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
              </div>
            </div>

            <div className="w-full h-full col-span-3 row-span-4 rounded-xl">
              <video
                ref={remoteVideoRef}
                autoPlay
                muted
                className="bg-red-100 w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="col-span-3 row-span-2 rounded-xl flex flex-col justify-between gap-4">
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <div className="h-full flex items-center xl:text-3xl font-semibold gap-4">
                  <Camera />
                  함께 사진찍기
                </div>
              </div>
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <span className="h-full flex items-center xl:text-3xl font-semibold gap-4 ">
                  <Game />
                  게임하기
                </span>
              </div>
              <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
                <span className="h-full flex items-center xl:text-3xl font-semibold gap-4">
                  <Youtube />
                  유튜브 같이보기
                </span>
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
    </div>
  );
};
