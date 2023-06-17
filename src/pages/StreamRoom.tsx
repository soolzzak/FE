/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import { DetailUserProfile, getDetailUserProfile } from '../api/mypage';
import { getRoom } from '../api/streamRoom';
import { Game } from '../assets/svgs/Game';
import { Youtube } from '../assets/svgs/Youtube';
import { KickoutModal } from '../components/StreamRoom/KickoutModal';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { RemoteUserSection } from '../components/StreamRoom/RemoteUserSection';
import { Toast } from '../components/StreamRoom/Toast';
import { WaitingGuestRef } from '../components/StreamRoom/WaitingGuestRef';
import { Modal } from '../components/common/Modal';
import { ToastIcon } from '../assets/svgs/ToastIcon';
import { ControlStreamRoom } from '../components/StreamRoom/ControlStreamRoom';
import { ModifyRoomModal } from '../components/StreamRoom/ModifyRoomModal';
import { roomPasswordAtom, streamRoomInfoAtom } from '../store/addRoomStore';
import {
  isOpenKickoutModalAtom,
  isOpenLeaveRoomAtom,
  isOpenModifyRoomAtom,
  toastAtom,
} from '../store/modalStore';
import {
  hostIdAtom,
  micOnAtom,
  micOnChangeAtom,
  monitorOnAtom,
  monitorOnChangeAtom,
} from '../store/streamControlStore';
import { ScreenShare } from '../assets/svgs/ScreenShare';

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
  const remoteWebcamVideoRef = useRef<HTMLVideoElement>(null);
  const myWebcamVideoRef = useRef<HTMLVideoElement>(null);
  const signalingServerUrl = 'wss://api.honsoolzzak.com/signal';
  const [, setRoomPassword] = useAtom(roomPasswordAtom);
  const [roomInfo, setRoomInfo] = useAtom(streamRoomInfoAtom);

  const navigate = useNavigate();
  const [peerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [peerConnection1] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [socket] = useState<WebSocket>(new WebSocket(signalingServerUrl));
  const [guestProfile, setGuestProfile] = useState<DetailUserProfile>();
  const [, micOnChange] = useAtom(micOnChangeAtom);
  const [, monitorOnChange] = useAtom(monitorOnChangeAtom);
  const [, setRemoteMonitorOn] = useState<boolean>(false);
  const [guestIn, setGuestIn] = useState<boolean>(false);
  const [socketIsOnline, setSocketIsOnline] = useState<boolean>(false);
  const [isMyScreenShare, setIsMyScreenShare] = useState<boolean>(false);
  const [isRemoteScreenShare, setIsRemoteScreenShare] =
    useState<boolean>(false);

  let mediaStream: MediaStream | null = null;
  let remoteMediaStream: MediaStream | null = null;

  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [toastHover, setToastHover] = useState(false);
  const [modifyRoomIsOpen, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);
  const [numberShare, setNumberShare] = useState(0);
  const [, setHostIdcheck] = useAtom(hostIdAtom);

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
  const [isOpenKickOut, setIsOpenKickOut] = useAtom(isOpenKickoutModalAtom);

  const getCookie = Cookies.get('refreshKey');
  const params = useParams().id;

  let userId: string;
  if (getCookie) {
    userId = jwtDecode<JwtPayload>(getCookie || '').auth.id;
  }

  const roomNum = params;

  const handleOfferMessage = async (message: RTCSessionMessage) => {
    // console.log('accepting offer', message);
    const answerSDP = new RTCSessionDescription(message.sdp);
    setGuestIn(true);
    try {
      // console.log('setRemoteDescription', message.sdp);
      if (peerConnection.connectionState !== 'connected') {
        await peerConnection.setRemoteDescription(answerSDP);
        const answer = await peerConnection.createAnswer();
        // console.log('setLocalDescription', answer);
        await peerConnection.setLocalDescription(answer);

        const response = {
          from: userId,
          data: Number(roomNum),
          type: 'answer',
          sdp: peerConnection.localDescription,
        };

        // console.log('sending sdp', peerConnection.localDescription);
        // console.log('added answer to peerConnection', peerConnection);
        // console.log('sending answer to received offer', response);
        socket.send(JSON.stringify(response));
      } else {
        await peerConnection1.setRemoteDescription(answerSDP);
        const answer = await peerConnection1.createAnswer();
        // console.log('setLocalDescription', answer);
        await peerConnection1.setLocalDescription(answer);

        const response = {
          from: userId,
          data: Number(roomNum),
          type: 'answer',
          sdp: peerConnection1.localDescription,
        };

        // console.log('sending sdp', peerConnection1.localDescription);
        // console.log('added answer to peerConnection', peerConnection1);
        // console.log('sending answer to received offer', response);
        socket.send(JSON.stringify(response));
      }
    } catch (error) {
      // console.error('Error handling offer:', error);
    }
  };

  const handleAnswerMessage = async (message: RTCSessionMessage) => {
    // console.log('have received answer', message.sdp);

    try {
      // console.log('setRemotelDescription', message.sdp);

      if (peerConnection.connectionState !== 'connected') {
        // console.log(
        //   'using received answer for Remote peer description',
        //   peerConnection
        // );
        await peerConnection.setRemoteDescription(message.sdp);
      } else {
        // console.log(
        //   'using received answer for Remote peer description1',
        //   peerConnection1
        // );
        await peerConnection1.setRemoteDescription(message.sdp);
      }
    } catch (error) {
      // console.error('Error handling answer:', error);
    }
  };

  const handleCandidateMessage = async (message: RTCIceMessage) => {
    try {
      if (peerConnection.connectionState !== 'connected') {
        await peerConnection.addIceCandidate(message.candidate);
      } else {
        await peerConnection1.addIceCandidate(message.candidate);
      }
    } catch (error) {
      // console.error('Error handling candidate:', error);
    }
  };

  const startCall = async () => {
    try {
      // console.log('sending offer using peer: ', peerConnection);
      const offer = await peerConnection.createOffer();
      // console.log('setLocalDescription', offer);
      await peerConnection.setLocalDescription(offer);

      const message = {
        from: userId,
        type: 'offer',
        data: Number(roomNum),
        sdp: peerConnection.localDescription,
      };
      // console.log('sending sdp', peerConnection.localDescription);
      // console.log('sending offer', message);
      socket.send(JSON.stringify(message));
    } catch (error) {
      // toast.error('Error creating offer:', error);
    }
  };

  const createPeerConnection = async () => {
    // console.log('created peer connection: ', peerConnection);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to the remote peer via signaling channel
        // console.log('sending ice candidate', event.candidate);
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
      // console.log('응', peerConnection.getSenders());

      // console.log('got remote stream', event.streams[0]);
      const stream = event.streams[0];
      if (remoteVideoRef.current) {
        // console.log('adding remote stream to video element');
        remoteVideoRef.current.srcObject = stream;
        // console.log('stream?', stream);
      }
      // console.log('remote ref', remoteVideoRef.current);
      // console.log(
      //   'remoteVideoRef.current.srcObject',
      //   remoteVideoRef.current?.srcObject
      // );
    };
    peerConnection.oniceconnectionstatechange = () => {
      // console.log('opposing user disconnect event');
      if (
        peerConnection.iceConnectionState === 'disconnected' ||
        peerConnection.iceConnectionState === 'closed'
      ) {
        // console.log('Opposing peer disconnected');
        if (remoteVideoRef.current) {
          if (remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject as MediaStream;
            // stream.getTracks().forEach((track) => track.stop());
          }
          remoteVideoRef.current.srcObject = null;
        }
        // console.log(
        //   'remoteVideoRef.current.srcObject',
        //   remoteVideoRef.current?.srcObject
        // );
        setNumberShare((prev) => prev - 1);
        setIsRemoteScreenShare(() => false);
        setRemoteMonitorOn(() => false);
        setGuestIn(() => false);
        setGuestProfile(() => undefined);
        // console.log('peerConnection', peerConnection);
      }
    };

    // console.log('adding media stream to track', mediaStream);
    mediaStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, mediaStream as MediaStream);
    });
  };

  const startLocalStream = async () => {
    try {
      // eslint-disable-next-line no-undef
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log('stream담기나?', stream);
      mediaStream = stream;
      setMyMediaStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // console.log('this media stream', mediaStream);
    } catch (error) {
      // console.log('Error accessing media devices:', error);
    }
  };

  const sendJoinMessage = () => {
    const message = JSON.stringify({
      from: userId,
      type: 'join',
      data: roomNum,
    });
    socket.send(message);
    // console.log('send join message');
  };

  const createScreenSharePeerConnection = async () => {
    // console.log('created peer connection: ', peerConnection1);

    peerConnection1.onicecandidate = (event) => {
      if (event.candidate) {
        // console.log('sending ice candidate', event.candidate);
        const message = {
          from: userId,
          data: Number(roomNum),
          type: 'ice',
          candidate: event.candidate,
        };
        socket.send(JSON.stringify(message));
      }
    };
    peerConnection1.ontrack = (event) => {
      // console.log('응', peerConnection1.getSenders());
      // console.log('got remote stream', event.streams[0]);
      // console.log(isRemoteScreenShare, remoteWebcamVideoRef.current);
      const stream = event.streams[0];
      remoteMediaStream = stream;
    };
    peerConnection1.oniceconnectionstatechange = () => {
      // console.log(' remote media', remoteMediaStream);
      // console.log('opposing user disconnect event');
      if (
        peerConnection1.iceConnectionState === 'disconnected' ||
        peerConnection1.iceConnectionState === 'closed'
      ) {
        // console.log('Opposing peer disconnected');
        if (remoteWebcamVideoRef.current) {
          if (remoteWebcamVideoRef.current.srcObject) {
            remoteWebcamVideoRef.current.srcObject as MediaStream;
            // stream.getTracks().forEach((track) => track.stop());
          }
          remoteWebcamVideoRef.current.srcObject = null;
        }
        // console.log(
        //   'remoteWebcamVideoRef.current.srcObject',
        //   remoteWebcamVideoRef.current?.srcObject
        // );
        setNumberShare((prev) => prev - 1);
        setRemoteMonitorOn(() => false);
        setGuestIn(() => false);
        setGuestProfile(() => undefined);
        // console.log('peerConnection', peerConnection1);
      }
    };

    // console.log('adding media stream to track', mediaStream);
    mediaStream?.getTracks().forEach((track) => {
      peerConnection1.addTrack(track, mediaStream as MediaStream);
    });
  };

  const closeMediaStream = () => {
    // console.log('closing');
    if (localVideoRef.current) {
      if (localVideoRef.current.srcObject) {
        // console.log('closing');
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    if (remoteVideoRef.current) {
      if (remoteVideoRef.current.srcObject) {
        // console.log('closing');
        const stream = remoteVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    if (remoteWebcamVideoRef.current) {
      if (remoteWebcamVideoRef.current.srcObject) {
        // console.log('closing');
        const stream = remoteWebcamVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    if (myWebcamVideoRef.current) {
      if (myWebcamVideoRef.current.srcObject) {
        // console.log('closing');
        const stream = myWebcamVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    peerConnection.close();
  };

  window.onpopstate = () => {
    closeMediaStream();
  };

  useEffect(() => {
    const connectToSignalingServer = async () => {
      socket.onopen = () => {
        // console.log('WebSocket connection opened');
      };

      socket.onclose = () => {
        // console.log('WebSocket connection closed');
        // closeMediaStream();
        // navigate('/');
      };

      socket.onerror = () => {
        // console.error('WebSocket error:', error);
      };

      socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'info':
            // console.log('received info message', message);
            await startLocalStream();
            await sendJoinMessage();
            break;
          case 'offer':
            // console.log('received offer message', message);
            // console.log('offerMessage remote media', remoteMediaStream);

            await handleOfferMessage(message);
            break;
          case 'answer':
            // console.log('received answer message', message);
            // console.log('answer remote media', remoteMediaStream);
            setGuestIn(() => true);

            await handleAnswerMessage(message);
            break;
          case 'ice':
            guestProfileMutation.mutate(message.from);
            // console.log('received ice message', message);
            // console.log('ice remote media', remoteMediaStream);
            await handleCandidateMessage(message);
            break;
          case 'toast':
            // console.log('received toast message', message);
            showToastHandler();
            break;
          case 'startShare':
            // console.log('received startShare message', message);
            setIsRemoteScreenShare(true);
            setNumberShare((prev) => prev + 0.5);
            setTimeout(() => {
              if (remoteWebcamVideoRef.current) {
                // console.log(' remote media', remoteMediaStream);
                // console.log('adding screenshare video element');
                remoteWebcamVideoRef.current.srcObject = remoteMediaStream;
              }
            }, 300);
            break;
          case 'stopShare':
            // console.log('received stopShare message', message);
            // console.log('startshare remote media', remoteMediaStream);
            setIsRemoteScreenShare(() => false);
            setNumberShare((prev) => prev - 1);
            break;
          case 'join':
            // console.log('received join message');
            // console.log('join remote media', remoteMediaStream);
            setSocketIsOnline(true);
            message.data = await getRoom(params as string);
            setHostIdcheck(message.data.hostId);
            setRoomInfo(message.data);
            setRoomPassword(null);
            // console.log('get room? ', message.data);
            // setGuestIn(prev => true);
            await createPeerConnection();
            await createScreenSharePeerConnection();
            // console.log(message.data.data.hostId);
            if (message.data?.hostId !== userId) {
              // console.log('starting call');
              await startCall();
            }
            break;
          case 'ping':
            break;
          default:
            break;
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
  // console.log('base remote media', remoteMediaStream);
  const micToggleHandler = () => {
    const audio = localVideoRef.current;
    if (audio && myMediaStream) {
      const audioTrack = myMediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      micOnChange(micOnAtom);
    }
  };

  const videoToggleHandler = () => {
    const video = localVideoRef.current;
    if (video && myMediaStream) {
      const videoTrack = myMediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      monitorOnChange(monitorOnAtom);
    }
  };

  const sendToastMessage = () => {
    // console.log('click toast');
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'toast',
        data: roomNum,
      });
      // console.log('toast sent', message);
      showToastHandler();
      socket.send(message);
    }
  };
  const sendShareOnMessage = () => {
    // console.log('click share On');
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'startShare',
        data: roomNum,
      });
      // console.log('startShare sent', message);
      socket.send(message);
    }
  };
  const sendShareOffMessage = () => {
    // console.log('click share Off');
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'stopShare',
        data: roomNum,
      });
      // console.log('stopeShare sent', message);
      socket.send(message);
    }
  };

  const sendKickMessage = () => {
    const message = JSON.stringify({
      from: userId,
      type: 'kick',
      data: roomNum,
    });
    socket.send(message);
    // console.log('send kick message');
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (socket) {
      // console.log('timer started');
      intervalId = setInterval(() => {
        const message = JSON.stringify({
          from: userId,
          type: 'ping',
          data: roomNum,
        });
        // console.log('sending ping', message);
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
    // if (guestIn) console.log('remote ref2', remoteVideoRef);
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
  // console.log('shareView', shareView);

  useEffect(() => {
    // shareView가 변경되면 localVideoRef에 스트림을 설정합니다.
    if (shareView && localVideoRef.current) {
      localVideoRef.current.srcObject = shareView;
    } else if (localVideoRef.current) {
      localVideoRef.current.srcObject = myMediaStream;
      // console.log('다시주입되니', myMediaStream);
    }
    if (shareView) {
      shareView.onremovetrack = () => {
        // console.log('removeTrack');
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
    audio: true,
  };
  const startShare = async () => {
    try {
      // console.log('sending offer using peer11111111: ', peerConnection1);
      const offer = await peerConnection1.createOffer();
      // console.log('setLocalDescription', offer);
      await peerConnection1.setLocalDescription(offer);

      const message = {
        from: userId,
        type: 'offer',
        data: Number(roomNum),
        sdp: peerConnection1.localDescription,
      };
      // console.log('sending sdp', peerConnection1.localDescription);
      // console.log('sending offer', message);
      socket.send(JSON.stringify(message));
    } catch (error) {
      // console.error('Error creating offer:', error);
    }
  };

  // 화면 공유를 시작
  const startScreenShare = async () => {
    // console.log('히히', peerConnection.getSenders());
    try {
      if (!navigator.mediaDevices.getDisplayMedia) {
        throw new Error('Screen sharing is not supported.');
      }

      // 화면 공유 스트림 가져오기
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      sendShareOnMessage();
      setShareView(stream); // 화면 공유 스트림 상태 업데이트
      setIsMyScreenShare(true);
      setNumberShare((prev) => prev + 1);
      await startShare();
      // console.log('mediaStream start', myMediaStream);
      if (myWebcamVideoRef.current) {
        myWebcamVideoRef.current.srcObject = myMediaStream;
      }
      // 화면 공유 스트림으로 트랙 교체
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          // console.log('화면공유스트림', stream);
          sender.replaceTrack(stream.getVideoTracks()[0]);
          // console.log('겟비디오', stream.getVideoTracks());
        }
      });

      // console.log('트랙교체', peerConnection.getSenders());

      // 화면 공유 스트림 종료
      // console.log('sender stream', stream);
      stream.getVideoTracks()[0].onended = () => {
        sendShareOffMessage();
        if (localVideoRef.current) {
          setShareView(null);
          setIsMyScreenShare(false);
          setNumberShare((prev) => prev - 1);
          localVideoRef.current.srcObject = myMediaStream;
          // console.log('mediastream 바꾸자0', myMediaStream);
        }
        // console.log('mediastream 바꾸자1', myMediaStream);
        peerConnection.getSenders().forEach((sender) => {
          // console.log('mediastream 바꾸자2', myMediaStream);
          if (sender.track?.kind === 'video' && myMediaStream) {
            // console.log('mediastream 바꾸자3', myMediaStream);
            sender.replaceTrack(myMediaStream.getVideoTracks()[0]);
            // console.log('if mediaStream', myMediaStream);
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
      // toast.error('Error starting screen share:', error);
    }
  };

  // console.log('share', shareView);

  // className 추가
  let firstVideoClassName = 'w-full rounded-2xl';
  if (numberShare === 0) {
    firstVideoClassName +=
      ' xl:col-span-2 xl:row-span-3 xl:relative xl:top-0 xl:right-0 xl:max-w-full xl:max-h-full absolute top-5 right-5 max-w-[300px] h-fit';
  } else if (numberShare === 1) {
    firstVideoClassName +=
      ' xl:col-span-2 xl:row-span-3 xl:relative xl:top-0 xl:right-0 xl:max-w-full xl:max-h-full absolute top-5 right-5 max-w-[250px] h-fit';
  } else if (numberShare === 2) {
    firstVideoClassName +=
      ' xl:col-span-2 xl:row-span-3 xl:relative xl:top-0 xl:right-0 xl:max-w-full xl:max-h-full absolute top-[40px] right-5 max-w-[200px] h-fit';
  }

  let secondVideoClassName = 'w-full rounded-2xl';
  if (numberShare === 0) {
    secondVideoClassName += ' hidden';
  } else if (numberShare === 1) {
    secondVideoClassName +=
      ' xl:col-span-2 xl:row-span-3 xl:relative xl:top-0 xl:right-0 xl:max-w-full xl:max-h-full absolute top-[227.5px] right-5 max-w-[250px] h-fit';
  } else if (numberShare === 2) {
    secondVideoClassName +=
      ' xl:absolute xl:top-5 xl:left-5 xl:max-w-[250px] xl:h-auto absolute top-[360px] right-5 max-w-[200px] h-fit';
  }

  let thirdVideoClassName = 'w-full rounded-2xl';
  if (numberShare === 0) {
    thirdVideoClassName += ' hidden';
  } else if (numberShare === 1) {
    thirdVideoClassName += ' hidden';
  } else if (numberShare === 2) {
    thirdVideoClassName +=
      ' xl:col-span-2 xl:row-span-3 xl:relative xl:top-0 xl:right-0 xl:max-w-full xl:max-h-full absolute top-[220px] right-5 max-w-[200px] h-fit';
  }

  let controlBtnClassName = 'flex items-center gap-4 relative';
  if (numberShare === 0) {
    controlBtnClassName +=
      ' xl:justify-self-center justify-self-end xl:col-span-4 col-start-2 xl:row-start-6 row-start-6';
  } else if (numberShare === 1) {
    controlBtnClassName +=
      ' justify-self-end xl:col-start-3 xl:col-span-2 xl:row-start-6 xl:mr-1 col-start-2 row-start-6';
  } else if (numberShare === 2) {
    controlBtnClassName +=
      ' justify-self-end xl:col-start-3 xl:col-span-2 xl:row-start-6 xl:mr-1 col-start-2 row-start-6';
  }

  let activityBtnClassName = 'w-full h-full gap-4';
  if (numberShare === 0) {
    activityBtnClassName +=
      ' xl:f-col xl:col-start-5 xl:col-span-2 xl:row-start-4 xl:row-span-3 col-start-1 row-start-6 flex';
  } else if (numberShare === 1) {
    activityBtnClassName +=
      ' xl:col-start-1 xl:col-span-2 xl:row-start-6 flex xl:ml-1 col-start-1 row-start-6';
  } else if (numberShare === 2) {
    activityBtnClassName +=
      ' xl:col-start-1 xl:col-span-2 xl:row-start-6 flex xl:ml-1 col-start-1 row-start-6';
  }

  let activityBtnSubClassName =
    'f-jic xl:text-xl font-semibold gap-4 rounded-2xl shadow-sm';
  if (numberShare === 0) {
    activityBtnSubClassName +=
      ' xl:h-1/3 xl:border xl:border-[#D9D9D9] hover:cursor-pointer';
  }

  const delayServiceMessage = () => {
    toast.error('추후 서비스 예정입니다');
  };

  // console.log('numbershare', numberShare);

  return (
    <div className="w-full h-full min-w-[660px]">
      {showToast && <Toast />}
      <div className="f-col pt-24">
        <div className="border rounded-2xl f-col max-w-[1500px] w-full h-full mx-auto py-5 px-5 bg-white">
          <div className="flex flex-row-reverse w-full xl:h-16 h-12 mb-5 justify-between">
            <div className="flex items-center xl:text-3xl text-xl font-semibold pr-1 truncate">
              &quot;{roomInfo?.title}&quot;
            </div>
            {guestProfile && (
              <RemoteUserSection
                guestProfile={guestProfile}
                guestProfileMutation={guestProfileMutation}
              />
            )}
          </div>

          {/* 여기 비디오 부분 */}

          <div className="relative w-full h-full grid xl:grid-cols-6 xl:grid-rows-6 grid-cols-2 grid-rows-6 gap-4">
            {/* 메인비디오 화면 */}
            <div className="relative w-full h-full xl:col-span-4 col-span-2 xl:row-span-5 row-span-5">
              <div className="relative w-full">
                {guestIn ? (
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="bg-black w-full h-full object-contain rounded-2xl max-h-[600px] min-h-[600px]"
                  />
                ) : (
                  <WaitingGuestRef />
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                  <span className="text-white text-lg">
                    {isRemoteScreenShare
                      ? `${guestProfile?.username}님의 공유화면`
                      : guestProfile?.username}
                  </span>
                </div>
              </div>
              {/* 건배 */}
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
            </div>

            {/* 메인버튼 */}
            <div className={controlBtnClassName}>
              <ControlStreamRoom
                micToggleHandler={micToggleHandler}
                videoToggleHandler={videoToggleHandler}
                startScreenShare={startScreenShare}
              />
            </div>

            {/* sub first */}
            <div className={firstVideoClassName}>
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-contain rounded-2xl xl:min-h-[360px] xl:max-h-[360px] max-h-[150px] min-h-[190px]"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                <span className="text-white text-lg">
                  {isMyScreenShare ? '나의 공유화면' : '나'}
                </span>
              </div>
            </div>

            {isMyScreenShare && (
              <div className={secondVideoClassName}>
                <video
                  ref={myWebcamVideoRef}
                  autoPlay
                  muted
                  className="w-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                  <span className="text-white text-lg">
                    {isMyScreenShare && isRemoteScreenShare
                      ? '나'
                      : `${
                          !isMyScreenShare && isRemoteScreenShare
                            ? guestProfile?.username
                            : '나'
                        }`}
                  </span>
                </div>
              </div>
            )}

            {isRemoteScreenShare && (
              <div
                className={
                  numberShare === 1 ? secondVideoClassName : thirdVideoClassName
                }
              >
                <video
                  ref={remoteWebcamVideoRef}
                  autoPlay
                  muted
                  className="w-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                  <span className="text-white text-lg">
                    {isMyScreenShare && isRemoteScreenShare
                      ? guestProfile?.username
                      : `${
                          !isMyScreenShare && isRemoteScreenShare
                            ? guestProfile?.username
                            : '나'
                        }`}
                  </span>
                </div>
              </div>
            )}

            {/* activity button */}
            <div className={activityBtnClassName}>
              <motion.div
                role="none"
                className={activityBtnSubClassName}
                onClick={startScreenShare}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`${
                    numberShare >= 1 ? '' : 'xl:min-w-[200px] xl:f-ic xl:gap-4'
                  }`}
                >
                  <div className="iconStyle bg-[#E0F5E6]">
                    <ScreenShare />
                  </div>
                  <span
                    className={`${
                      numberShare >= 1 ? 'hidden' : 'xl:inline hidden'
                    }`}
                  >
                    화면 공유하기
                  </span>
                </div>
              </motion.div>

              <div
                role="none"
                className={activityBtnSubClassName}
                onClick={delayServiceMessage}
              >
                <div
                  className={`${
                    numberShare >= 1 ? '' : 'xl:min-w-[200px] xl:f-ic xl:gap-4'
                  }`}
                >
                  <Game />
                  <span
                    className={`${
                      numberShare >= 1 ? 'hidden' : 'xl:inline hidden'
                    }`}
                  >
                    게임하기
                  </span>
                </div>
              </div>

              <div
                role="none"
                className={activityBtnSubClassName}
                onClick={delayServiceMessage}
              >
                <div
                  className={`${
                    numberShare >= 1 ? '' : 'xl:min-w-[200px] xl:f-ic xl:gap-4'
                  }`}
                >
                  <Youtube />
                  <span
                    className={`${
                      numberShare >= 1 ? 'hidden' : 'xl:inline hidden'
                    }`}
                  >
                    유튜브
                  </span>
                </div>
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
        <LeaveRoomModal closeMediaStream={closeMediaStream} />
      </Modal>

      <Modal isOpen={isOpenKickOut} onClose={() => setIsOpenKickOut(false)}>
        {guestProfile && (
          <KickoutModal
            onClose={() => setIsOpenKickOut(false)}
            sendKickMessage={sendKickMessage}
            username={guestProfile?.username}
          />
        )}
      </Modal>

      <Modal
        isOpen={modifyRoomIsOpen}
        onClose={() => setModiftRoomIsOpen(false)}
        hasOverlay
      >
        <ModifyRoomModal />
      </Modal>
    </div>
  );
};
