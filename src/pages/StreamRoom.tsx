/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import YouTube from 'react-youtube';
import { DetailUserProfile, getDetailUserProfile } from '../api/mypage';
import { getRoom } from '../api/streamRoom';
import { Game } from '../assets/svgs/Game';
import { ToastIcon } from '../assets/svgs/ToastIcon';
import { Youtube } from '../assets/svgs/Youtube';
import { DetailUserInfoModal } from '../components/Mypage/DetailUserInfoModal';
import { ControlStreamRoom } from '../components/StreamRoom/ControlStreamRoom';
import { KickoutModal } from '../components/StreamRoom/KickoutModal';
import { LeaveRoomModal } from '../components/StreamRoom/LeaveRoomModal';
import { ModifyRoomModal } from '../components/StreamRoom/ModifyRoomModal';
import { RemoteUserSection } from '../components/StreamRoom/RemoteUserSection';
import { Toast } from '../components/StreamRoom/Toast';
import { WaitingGuestRef } from '../components/StreamRoom/WaitingGuestRef';
import { YoutubeContent } from '../components/StreamRoom/YoutubeContent';
import { CommonButton } from '../components/common/CommonButton';
import { Modal } from '../components/common/Modal';
import { ModalInput } from '../components/common/ModalInput';
import { roomPasswordAtom, streamRoomInfoAtom } from '../store/addRoomStore';
import { userTokenAtom } from '../store/mainpageStore';
import {
  isOpenIceBreakerModalAtom,
  isOpenKickoutModalAtom,
  isOpenLeaveRoomAtom,
  isOpenModifyRoomAtom,
  isOpenYoutubeVideoModalAtom,
  toastAtom,
} from '../store/modalStore';
import {
  hostIdAtom,
  micOnAtom,
  monitorOnAtom,
} from '../store/streamControlStore';
import { convertUrltoVideoId } from '../utils/getYoutubeVideoId';

import { GameApple } from '../assets/svgs/GameApple';
import { GameNote } from '../assets/svgs/GameNote';
import { GamePencil } from '../assets/svgs/GamePencil';
import { GameScissors } from '../assets/svgs/GameScissors';
import { Camera } from '../assets/svgs/Camera';

import { YoutubeModal } from '../components/StreamRoom/Modals/YoutubeModal';
import { PhotoConfirmModal } from '../components/StreamRoom/Modals/PhotoConfirmModal';

import { GameUnderline } from '../assets/svgs/GameUnderline';
import { IceBreaking } from '../assets/svgs/Icebreaking';
import { TakeSnapshot } from '../components/StreamRoom/TakeSnapshot';
import { IceGame } from '../assets/svgs/IceGame';
import { IceGameQ } from '../assets/svgs/IceGameQ';

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
  const playerRef = useRef<YouTube>(null);
  const signalingServerUrl = 'wss://api.honsoolzzak.com/signal';
  const [, setRoomPassword] = useAtom(roomPasswordAtom);
  const [roomInfo, setRoomInfo] = useAtom(streamRoomInfoAtom);

  const navigate = useNavigate();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [peerConnection1, setPeerConnection1] = useState<RTCPeerConnection>(
    new RTCPeerConnection(PeerConnectionConfig)
  );
  const [socket] = useState<WebSocket>(new WebSocket(signalingServerUrl));
  const [guestProfile, setGuestProfile] = useState<DetailUserProfile>();
  const [, setMicOn] = useAtom(micOnAtom);
  const [, setMonitorOn] = useAtom(monitorOnAtom);
  const [, setRemoteMonitorOn] = useState<boolean>(false);
  const [guestIn, setGuestIn] = useState<boolean>(false);
  const [socketIsOnline, setSocketIsOnline] = useState<boolean>(false);
  const [isMyScreenShare, setIsMyScreenShare] = useState<boolean>(false);
  const [isRemoteScreenShare, setIsRemoteScreenShare] =
    useState<boolean>(false);

  let mediaStream: MediaStream | null = null;
  const [userInfo] = useAtom(userTokenAtom);
  const [userId, setUserId] = useState(userInfo?.auth.id);
  const [isHost, setIsHost] = useState(false);
  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);
  const [myWebcamMediaStream, setMyWebcamMediaStream] =
    useState<MediaStream | null>(null);
  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const [remoteWebcamStream, setRemoteWebcamStream] =
    useState<MediaStream | null>(null);
  const [toastHover, setToastHover] = useState(false);
  const [modifyRoomIsOpen, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [youtubeModalIsOpen, setYoutubeModalIsOpen] = useAtom(
    isOpenYoutubeVideoModalAtom
  );
  const [openConfirmModalIsOpen, setOpenConfirmModalIsOpen] = useState(false);
  const [waitingForPhotoConfirm, setWaitingForPhotoConfirm] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [numberShare, setNumberShare] = useState(0);
  const [, setHostIdcheck] = useAtom(hostIdAtom);
  const [idiom, setIdiom] = useState('');

  const [shareView, setShareView] = useState<MediaStream | null>(null); // 화면 공유 스트림 상태 추가

  const [gamecount, setgameCount] = useState(0);
  const [startgamecount, setStartgameCount] = useState(0);

  const [isGamePaused, setGamePaused] = useState(false);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);

  const [iceBreakerModalIsOpen, setIceBreakerModalIsOpen] = useAtom(
    isOpenIceBreakerModalAtom
  );
  const [iceBreakerStarted, setIceBreakerStarted] = useState(false);
  const [iceQuestion, setIceQuestion] = useState('');

  const [youtubeIsOn, setYoutubeIsOn] = useState(false);
  const [takePicture, setTakePicture] = useState(false);
  const waitForGuestWarning = () => {
    toast.error('짝꿍을 기다려 주세요!');
  };

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

  const roomNum = params;

  const handleOfferMessage = async (message: RTCSessionMessage) => {
    // console.log('accepting offer', message);
    const answerSDP = new RTCSessionDescription(message.sdp);
    setGuestIn(true);
    try {
      console.log('setRemoteDescription', message.sdp);
      console.log('peerconnection state', peerConnection.connectionState);
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
        console.log('sending answer to received offer', response);
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
        console.log('sending answer to received offer', response);
        socket.send(JSON.stringify(response));
      }
    } catch (error) {
      // console.error('Error handling offer:', error);
    }
  };

  const handleAnswerMessage = async (message: RTCSessionMessage) => {
    try {
      if (peerConnection.connectionState !== 'connected') {
        await peerConnection.setRemoteDescription(message.sdp);
      } else {
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
      console.log('sending offer', message);
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
      // console.log('응', peerConnection.getSenders());

      // console.log('got remote stream', event.streams[0]);
      const stream = event.streams[0];
      setRemoteMediaStream(stream);
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
        // setNumberShare((prev) => prev - 1);
        setIsRemoteScreenShare(() => false);
        setRemoteMonitorOn(() => false);
        setGuestIn(() => false);
        setGuestProfile(() => undefined);
        setIsMyScreenShare(false);
        setIsRemoteScreenShare(false);
        setYoutubeIsOn(false);
        setGameHasStarted(false);
        setRemoteMediaStream(null);
        setRemoteWebcamStream(null);
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
      setMyWebcamMediaStream(stream);
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
    console.log('send join message');
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
      console.log('got remote stream', event.streams[0]);
      // console.log(isRemoteScreenShare, remoteWebcamVideoRef.current);
      const stream = event.streams[0];
      setRemoteWebcamStream(stream);
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
        // setNumberShare((prev) => prev - 1);
        setIsRemoteScreenShare(() => false);
        setRemoteMonitorOn(() => false);
        setGuestIn(() => false);
        setGuestProfile(() => undefined);
        setIsMyScreenShare(false);
        setIsRemoteScreenShare(false);
        setYoutubeIsOn(false);
        setGameHasStarted(false);
        setRemoteMediaStream(null);
        setRemoteWebcamStream(null);
        // console.log('peerConnection', peerConnection1);
      }
    };

    // console.log('adding media stream to track', mediaStream);
    mediaStream?.getTracks().forEach((track) => {
      peerConnection1.addTrack(track, mediaStream as MediaStream);
    });
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

  const stopShare = () => {
    if (localVideoRef.current) {
      if (localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        console.log('stream share', stream);
        stream.getTracks().forEach((track) => track.stop());

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
      }
    }
  };

  const sendstopGameMessage = () => {
    setGameHasStarted(false);
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'stopGame',
        data: roomNum,
      });
      console.log('toast sent', message);
      // showToastHandler();
      socket.send(message);
    }
  };
  const closePreviousSession = async () => {
    if (remoteVideoRef.current) {
      if (remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject as MediaStream;
        // stream.getTracks().forEach((track) => track.stop());
      }
      remoteVideoRef.current.srcObject = null;
    }
    if (isMyScreenShare) stopShare();
    setRemoteMediaStream(null);
    setIsRemoteScreenShare(() => false);
    setRemoteMonitorOn(() => false);
    setGuestIn(() => false);
    setGuestProfile(() => undefined);
    setGameHasStarted(() => false);
    setYoutubeIsOn(() => false);
    // await createPeerConnection();
    // await createScreenSharePeerConnection();
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
    myWebcamMediaStream?.getTracks().forEach((track) => track.stop());
    myMediaStream?.getTracks().forEach((track) => track.stop());
    peerConnection.close();
    peerConnection1.close();
    socket.close();
  };
  const seekToTime = (time: number) => {
    console.log('seek to time', time);
    if (playerRef.current) {
      playerRef.current.internalPlayer.seekTo(time, true);
      playerRef.current.internalPlayer.playVideo();
    }
  };

  const onYoutubeWatchalongClick = () => {
    if (youtubeIsOn) {
      setNumberShare((prev) => prev - 1);
      const message = {
        from: userId,
        type: 'stopYoutube',
        data: roomNum,
      };
      console.log('youtube start', message);
      socket.send(JSON.stringify(message));
      setYoutubeIsOn(false);
      return;
    }
    setNumberShare((prev) => prev + 1);
    setYoutubeModalIsOpen(false);
    const message = {
      from: userId,
      type: 'youtube',
      data: roomNum,
      youtubeUrl: videoUrl,
    };
    console.log('youtube start', message);
    socket.send(JSON.stringify(message));
    setYoutubeIsOn(true);
    seekToTime(0);
  };

  const pauseYoutubeVideo = () => {
    console.log('pause');
    if (playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };
  useEffect(() => {
    if (!youtubeIsOn) {
      console.log('recover');
      if (remoteVideoRef.current) {
        console.log('recover', remoteMediaStream);
        remoteVideoRef.current.srcObject = remoteMediaStream;
      }
    }
    if (youtubeIsOn) {
      if (remoteWebcamVideoRef.current) {
        remoteWebcamVideoRef.current.srcObject = remoteMediaStream;
      }
    }
  }, [youtubeIsOn]);

  window.onpopstate = () => {
    closeMediaStream();
  };

  useEffect(() => {
    if (isRemoteScreenShare) {
      if (remoteWebcamVideoRef.current) {
        console.log(' remote media', remoteWebcamStream);
        console.log('adding screenshare video element');
        remoteWebcamVideoRef.current.srcObject = remoteWebcamStream;
      }
    }
  }, [isRemoteScreenShare, remoteWebcamStream]);
  // console.log('outside', remoteWebcamStream);

  useEffect(() => {
    if (!gameHasStarted) {
      console.log('recover');
      if (remoteVideoRef.current) {
        console.log('recover', remoteMediaStream);
        remoteVideoRef.current.srcObject = remoteMediaStream;
      }
    }
    if (gameHasStarted) {
      if (remoteWebcamVideoRef.current) {
        remoteWebcamVideoRef.current.srcObject = remoteMediaStream;
      }
    }
  }, [gameHasStarted]);

  useEffect(() => {
    if (!gameInfo) {
      console.log('recover');
      if (remoteVideoRef.current) {
        console.log('recover', remoteMediaStream);
        remoteVideoRef.current.srcObject = remoteMediaStream;
      }
    }
    if (gameInfo) {
      if (remoteWebcamVideoRef.current) {
        remoteWebcamVideoRef.current.srcObject = remoteMediaStream;
      }
    }
  }, [gameInfo]);

  useEffect(() => {
    if (iceBreakerModalIsOpen) {
      const timer = setTimeout(() => {
        setIceBreakerModalIsOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    console.log('질문', iceQuestion);
  }, [iceQuestion, iceBreakerModalIsOpen]);

  useEffect(() => {
    const connectToSignalingServer = async () => {
      socket.onopen = () => {
        console.log('WebSocket connection opened');
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        // closeMediaStream();

        // console.log('WebSocket connection closed');
        closeMediaStream();

        // navigate('/');
      };

      socket.onerror = () => {
        console.error('WebSocket error:', Error);
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
            // console.log('offerMessage remote media', remoteMediaStream);

            await handleOfferMessage(message);
            break;
          case 'answer':
            console.log('received answer message', message);
            // console.log('answer remote media', remoteMediaStream);
            setGuestIn(() => true);

            await handleAnswerMessage(message);
            break;
          case 'ice':
            guestProfileMutation.mutate(message.from);
            console.log('received ice message', message);
            // console.log('ice remote media', remoteMediaStream);
            await handleCandidateMessage(message);
            break;

          case 'toast':
            console.log('received toast message', message);
            showToastHandler();
            break;
          case 'sendPicture':
            console.log('received sendPicture message', message);
            setOpenConfirmModalIsOpen(true);

            break;
          case 'confirmPicture':
            console.log('received confirmPicture message', message);
            setTakePicture(true);
            setWaitingForPhotoConfirm(false);
            break;
          case 'youtube':
            setNumberShare((prev) => prev + 1);
            console.log('received youtube message', message);
            setVideoUrl(message.youtubeUrl);
            setYoutubeIsOn(true);
            seekToTime(0);

            break;
          case 'startYoutube':
            console.log('received startYoutube message', message);
            if (message.data?.hostId !== userId) seekToTime(message.time);
            break;
          case 'stopYoutube':
            setNumberShare((prev) => prev - 1);
            console.log('received stopYoutube message', message);
            setYoutubeIsOn(false);
            break;
          case 'pauseYoutube':
            console.log('received pauseYoutube message', message);
            pauseYoutubeVideo();
            break;

          case 'startGame':
            console.log('received startgame message', message);
            setGameInfo(false);
            setGameHasStarted(true);
            // console.log(message.idiom);
            // console.log(typeof message.idiom);

            setIdiom(message.word);
            console.log(idiom.length);
            setgameCount(message.count);
            setStartgameCount(message.startCount);

            break;

          case 'gameInfo':
            console.log('received gameInfo message', message);
            setGameInfo(true);
            break;

          case 'pauseGame':
            console.log('received pausegame message', message);
            // setgameCount(message.count);
            setIdiom(message.word);
            break;

          case 'stopGame':
            console.log('received stopgame message', message);
            setGameHasStarted(false);
            setIdiom(message.word);
            break;

          case 'iceBreaker':
            console.log('received icegame message', message);
            setIceBreakerStarted(true);
            console.log(message.question);
            setIceQuestion(message.question);
            setIceBreakerModalIsOpen(true);
            break;

          case 'startShare':
            // console.log('received startShare message', message);
            setIsRemoteScreenShare(true);
            setNumberShare((prev) => prev + 1);

            break;
          case 'kick':
            console.log('received kick message', message);
            closeMediaStream();
            toast.error('강퇴되었습니다.');
            navigate('/');
            break;
          case 'hostDisconnect':
            console.log('received host disconnect message', message);
            console.log(gameHasStarted);
            if (gameHasStarted) sendstopGameMessage();
            closeMediaStream();
            toast('방장이 퇴장하였습니다.');
            navigate('/');
            break;
          case 'guestDisconnect':
            setPeerConnection(new RTCPeerConnection(PeerConnectionConfig));
            setPeerConnection1(new RTCPeerConnection(PeerConnectionConfig));
            console.log('received guest disconnect message', message);
            if (gameHasStarted) sendstopGameMessage();
            toast('상대방이 퇴장하였습니다');
            closePreviousSession();
            break;

          case 'stopShare':
            console.log('received stopShare message', message);
            // console.log('startshare remote media', remoteMediaStream);
            setIsRemoteScreenShare(() => false);
            setNumberShare((prev) => prev - 1);
            break;

          case 'join':
            console.log('received join message');
            setSocketIsOnline(true);
            message.data = await getRoom(params as string);
            setHostIdcheck(message.data.hostId);
            setRoomInfo(message.data);
            setRoomPassword(null);
            await createPeerConnection();
            await createScreenSharePeerConnection();
            setIsHost(message.data?.hostId === userId);
            if (message.data?.hostId !== userId) {
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
      if (audioTrack.enabled) {
        setMicOn(true);
      } else {
        setMicOn(false);
      }
    }
  };

  const videoToggleHandler = () => {
    const video = localVideoRef.current;
    if (video && myMediaStream) {
      const videoTrack = myMediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      if (videoTrack.enabled) {
        setMonitorOn(true);
      } else {
        setMonitorOn(false);
      }
    }
  };

  useEffect(() => {
    const videoTrack = myMediaStream?.getVideoTracks()[0];
    if (videoTrack?.enabled) {
      setMonitorOn(true);
    } else {
      setMonitorOn(false);
    }

    const audioTrack = myMediaStream?.getAudioTracks()[0];
    if (audioTrack?.enabled) {
      setMicOn(true);
    } else {
      setMicOn(false);
    }
  }, [myMediaStream]);

  const sendToastMessage = () => {
    // console.log('click toast');
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

  const sendstartGameMessage = () => {
    if (!guestProfile) {
      toast.error('짝꿍을 기다려 주세요!');
    } else {
      setGameInfo(false);
      setGameHasStarted(true);
      if (socket) {
        const message = JSON.stringify({
          from: userId,
          type: 'startGame',
          data: roomNum,
        });
        console.log('toast sent', message);
        // showToastHandler();
        socket.send(message);
      }
    }
  };

  const sendGameInfoMessage = () => {
    // console.log('click toast');
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'gameInfo',
        data: roomNum,
      });
      setGameInfo(true);
      // console.log('toast sent', message);
      // showToastHandler();
      socket.send(message);
    }
  };

  const sendpauseGameMessage = () => {
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'pauseGame',
        data: roomNum,
      });
      console.log('toast sent', message);
      // showToastHandler();
      socket.send(message);
      setGamePaused(!isGamePaused);
    }
  };

  const sendIceGameMessage = () => {
    if (socket) {
      const message = JSON.stringify({
        from: userId,
        type: 'iceBreaker',
        data: roomNum,
      });
      console.log('icegame sent', message);
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
    if (!guestIn) {
      return waitForGuestWarning();
    }
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
  // console.log(videoUrl);
  // console.log('share', shareView);

  const modalOpenHandler = () => {
    if (!guestIn) {
      return waitForGuestWarning();
    }
    setYoutubeModalIsOpen(true);
  };

  let shareState: number;
  if (
    !isMyScreenShare &&
    !isRemoteScreenShare &&
    !gameHasStarted &&
    !youtubeIsOn
  ) {
    shareState = 0;
  } else if (
    isMyScreenShare &&
    !isRemoteScreenShare &&
    !gameHasStarted &&
    !youtubeIsOn
  ) {
    shareState = 1;
  } else if (
    (!isMyScreenShare && isRemoteScreenShare) ||
    gameHasStarted ||
    youtubeIsOn
  ) {
    shareState = 2;
  } else {
    shareState = 3;
  }

  let localVideoStyle = '';
  let myWebcamVideoStyle = '';
  let remoteVideoStyle = '';
  let remoteWebcamVideoStlye = '';
  let controlButtonStyle = '';
  let activityButtonStyle = '';
  let activityButtonSubStyle = '';

  if (shareState === 0) {
    localVideoStyle =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-1 xl:row-span-3 xl:top-0 xl:right-0 absolute top-5 right-5 w-64 h-64 z-10'; // 내얼굴(v)
    myWebcamVideoStyle = 'hidden';
    remoteVideoStyle =
      'w-full h-full bg-black col-start-1 col-span-4 row-start-1 row-span-5 rounded-2xl'; // 상대방 얼굴
    remoteWebcamVideoStlye = 'hidden';
    controlButtonStyle =
      'w-full h-full gap-4 xl:col-start-1 xl:col-span-4 row-start-6 row-span-1 xl:f-jic f-ic col-start-2 col-span-1 justify-end'; // 완료
    activityButtonStyle =
      'w-full h-full gap-4 xl:col-start-5 xl:col-span-2 xl:row-start-4 xl:row-span-3 xl:f-col col-start-1 col-span-1 row-start-6 row-span-1 f-ic';
    activityButtonSubStyle =
      'xl:h-1/3 f-jic rounded-2xl xl:border xl:border-[#D9D9D9] hover:cursor-pointer xl:w-full';
  } else if (shareState === 1) {
    localVideoStyle =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-1 xl:row-span-3 xl:top-0 xl:right-0 absolute top-5 right-5 w-64 h-64 z-10'; // 내가 공유(v)
    myWebcamVideoStyle =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-4 xl:row-span-3 xl:top-0 xl:right-0 absolute top-[300px] right-5 w-64 h-64 z-10'; // 내 얼굴 (v)
    remoteVideoStyle =
      'w-full h-full bg-black rounded-2xl xl:col-start-1 xl:col-span-4 row-start-1 row-span-5 col-start-1 col-span-2'; // 상대방 얼굴
    controlButtonStyle =
      'w-full h-full gap-4 xl:col-start-3 xl:col-span-2 row-start-6 row-span-1 f-ic justify-end col-start-2 col-span-1'; // 완료
    remoteWebcamVideoStlye = 'hidden';
    activityButtonStyle =
      'w-full h-full gap-4 col-start-1 col-span-2 row-start-6 row-span-1 f-ic justify-start';
    activityButtonSubStyle = '';
  } else if (shareState === 2) {
    localVideoStyle =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-1 xl:row-span-3 xl:top-0 xl:right-0 absolute top-5 right-5 w-64 h-64 z-10'; // 내 얼굴(v)
    myWebcamVideoStyle = 'hidden';
    remoteVideoStyle =
      'w-full h-full bg-black rounded-2xl xl:col-start-1 xl:col-span-4 row-start-1 row-span-5 col-start-1 col-span-2'; // 상대방 공유
    remoteWebcamVideoStlye =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-4 xl:row-span-3 xl:top-0 xl:right-0 absolute top-[300px] right-5 w-64 h-64'; // 상대방 얼굴
    controlButtonStyle =
      'w-full h-full gap-4 xl:col-start-3 xl:col-span-2 row-start-6 row-span-1 f-ic justify-end col-start-2 col-span-1'; // 완료
    activityButtonStyle =
      'w-full h-full gap-4 col-start-1 col-span-2 row-start-6 row-span-1 f-ic justify-start';
    activityButtonSubStyle = '';
  } else {
    localVideoStyle =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-1 xl:row-span-3 xl:top-0 xl:right-0 absolute top-[29px] right-5 w-52 h-52 z-10'; // 내가 공유(v)
    myWebcamVideoStyle =
      'xl:w-64 xl:h-64 bg-black rounded-2xl xl:top-4 xl:right-4 absolute top-[266px] right-5 w-52 h-52 z-10'; // 내 얼굴 (v)
    remoteVideoStyle =
      'w-full h-full bg-black rounded-2xl xl:col-start-1 xl:col-span-4 row-start-1 row-span-5 col-start-1 col-span-2'; // 상대방 공유
    remoteWebcamVideoStlye =
      'xl:w-full xl:h-full bg-black rounded-2xl xl:col-start-5 xl:col-span-2 xl:row-start-4 xl:row-span-3 xl:top-0 xl:right-0 absolute top-[503px] right-5 w-52 h-52'; // 상대방 얼굴
    controlButtonStyle =
      'w-full h-full gap-4 xl:col-start-3 xl:col-span-2 row-start-6 row-span-1 f-ic justify-end col-start-2 col-span-1'; // 완료
    activityButtonStyle =
      'w-full h-full gap-4 col-start-1 col-span-2 row-start-6 row-span-1 f-ic justify-start';
    activityButtonSubStyle = '';
  }
  const sendTakePictureOffer = () => {
    const message = JSON.stringify({
      from: userId,
      type: 'sendPicture',
      data: roomNum,
    });
    console.log('sending photo offer', message);
    socket.send(message);
  };
  const sendPhotoConfirmMessage = () => {
    const message = JSON.stringify({
      from: userId,
      type: 'confirmPicture',
      data: roomNum,
    });
    console.log('sending confirmation to photo offer', message);
    socket.send(message);
  };
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
                onOpen={() => setDetailModalIsOpen(true)}
                guestProfile={guestProfile}
                guestProfileMutation={guestProfileMutation}
              />
            )}
          </div>

          {!youtubeIsOn && !gameHasStarted && !gameInfo && (
            <div className="relative">
              <div
                role="none"
                onClick={sendToastMessage}
                onMouseOver={() => setToastHover(true)}
                onMouseOut={() => setToastHover(false)}
                className="w-14 h-14 f-jic absolute xl:right-[35%] top-5 ml-5 rounded-full bg-primary-300 hover:cursor-pointer z-10"
              >
                <ToastIcon />
                {toastHover ? (
                  <div className="absolute w-48 h-10 top-16 xl:right-0 ml-36 bg-white text-lg font-semibold rounded-xl f-jic">
                    건배할 때 눌러보세요!
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="relative w-full h-full grid xl:grid-cols-6 grid-cols-2 grid-rows-6 gap-3 min-h-[900px] max-h-[900px]">
            <div className={localVideoStyle}>
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="relative w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                <span className="text-white text-lg">
                  {isMyScreenShare ? '나의 공유화면' : '나'}
                </span>
              </div>
            </div>

            <div className={myWebcamVideoStyle}>
              <video
                ref={myWebcamVideoRef}
                autoPlay
                muted
                playsInline
                className="relative w-full h-full object-contain rounded-2xl"
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

            <div className={remoteVideoStyle}>
              {guestIn && !youtubeIsOn && !gameHasStarted && !gameInfo && (
                <>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="relative w-full h-full object-contain rounded-2xl"
                  />
                  <div className="absolute bottom-44 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                    <span className="text-white text-lg">
                      {isRemoteScreenShare
                        ? `${guestProfile?.username}님의 공유화면`
                        : guestProfile?.username}
                    </span>
                  </div>
                </>
              )}

              {!guestIn && !youtubeIsOn && !gameHasStarted && !gameInfo && (
                <WaitingGuestRef />
              )}
              {youtubeIsOn && userId && (
                <YoutubeContent
                  isHost={isHost}
                  roomNum={Number(roomNum)}
                  playerRef={playerRef}
                  videoLink={
                    videoUrl && (convertUrltoVideoId(videoUrl) as string)
                  }
                  socket={socket}
                  userId={userId}
                />
              )}

              {/* 게임설명 */}
              {gameInfo && (
                <div className="bg-[#FFCE95] flex items-center justify-center w-full h-full rounded-2xl">
                  <div className="relative flex justify-center items-center">
                    <GameNote />

                    <div className="absolute top-50 mb-2">
                      <p
                        style={{ fontFamily: 'KBO-Dia-Gothic_bold' }}
                        className="text-[#202020] text-5xl font-bold text-center mt-5 mb-10"
                      >
                        이어말하기 게임
                      </p>
                      <div
                        style={{
                          fontFamily: 'KBO-Dia-Gothic_medium',
                        }}
                        className="text-[#FF7A00] text-2xl mb-2 ml-6"
                      >
                        게임방법
                      </div>
                      <div className="flex flex-col items-center ">
                        <div
                          className="text-lg mb-5 ml-6"
                          style={{ fontFamily: 'KBO-Dia-Gothic_light' }}
                        >
                          1. 화면에 네 글자 중{' '}
                          <span style={{ fontFamily: 'KBO-Dia-Gothic_medium' }}>
                            앞의 두 글자
                          </span>{' '}
                          가 나타납니다. <br />
                          2. 한 명씩 돌아가면서{' '}
                          <span style={{ fontFamily: 'KBO-Dia-Gothic_medium' }}>
                            나머지 두글자
                          </span>
                          를 말해서{' '}
                          <span style={{ fontFamily: 'KBO-Dia-Gothic_medium' }}>
                            네 글자의 정답
                          </span>
                          을 맞춰주세요!
                          <br /> 3. 정답과 일치하면 성공! 다르면{' '}
                          <span style={{ fontFamily: 'KBO-Dia-Gothic_medium' }}>
                            실패 ~!
                          </span>
                        </div>
                        <button
                          type="button"
                          className="bg-[#FF8A00] text-4xl font-bold mt-5 text-[#FFFFFF] w-[231.65px] h-[61.04px] rounded-[71.9141px]"
                          onClick={sendstartGameMessage}
                          style={{ fontFamily: 'KBO-Dia-Gothic_bold' }}
                        >
                          START
                        </button>
                      </div>
                      <div className="absolute left-[250px] ml-60 -bottom-28">
                        <GamePencil />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 게임시작 */}
              {gameHasStarted && (
                <div className="bg-[#FFCE95] flex items-center justify-center w-full h-full rounded-2xl">
                  <div
                    role="none"
                    onClick={sendpauseGameMessage}
                    className={`absolute left-0 top-0 drop-shadow-xl flex items-center justify-center ml-8 mt-5 bg-[#FF8A00] text-2xl text-[#FFFFFF] rounded-[71px] 
                      ${
                        idiom === '게임 멈춤!' ? 'w-[127px]' : 'w-[119.73px]'
                      } h-[42.27px]`}
                  >
                    {idiom === '게임 멈춤!' ? '게임 재시작' : '게임 중지'}
                  </div>

                  <div className="relative flex justify-center items-center">
                    <div className="relative flex justify-center items-center">
                      <GameNote />

                      {startgamecount !== 0 && (
                        <div className="border-4 rounded-full border-[#FF6700] w-[158.07px] h-[158.07px] absolute top-50 right-50 flex justify-center items-center">
                          <div
                            className="text-8xl text-[#FF6700] translate-y-1"
                            style={{ fontFamily: 'GmarketSans' }}
                          >
                            {startgamecount}
                          </div>
                        </div>
                      )}

                      {idiom && !startgamecount && (
                        <>
                          <div
                            className={`absolute top-50 right-50 text-8xl text-[#3A3A3A] ${
                              idiom.length === 2 ? 'hidden' : ''
                            }`}
                            style={{ fontFamily: 'GmarketSans' }}
                          >
                            {idiom}
                          </div>

                          {idiom.length === 2 && (
                            <div
                              className="absolute top-50 right-50 text-8xl text-[#3A3A3A]"
                              style={{
                                fontFamily: 'GmarketSans',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <span>{idiom}</span>
                              <span
                                style={{
                                  marginLeft: '10px',
                                  marginTop: '50px',
                                }}
                              >
                                <GameUnderline />
                              </span>
                              <span
                                style={{
                                  marginLeft: '10px',
                                  marginTop: '50px',
                                }}
                              >
                                <GameUnderline />
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      {gamecount !== 0 && (
                        <div className="border-2 rounded-full border-[#FF6700] w-[75.21px] h-[75.21px] absolute top-4 lg:left-[270px] -left-10 lg:ml-80 ml-32 flex justify-center items-center">
                          <div
                            className="text-6xl text-[#FF6700] translate-y-2"
                            style={{ fontFamily: 'GmarketSans' }}
                          >
                            {gamecount}
                          </div>
                        </div>
                      )}
                    </div>
                    {!startgamecount && (
                      <div className="absolute -left-10 -top-2 hidden lg:block">
                        <GameScissors />
                      </div>
                    )}
                    {!startgamecount && (
                      <div className="absolute -bottom-5 -left-7">
                        <GameApple />
                      </div>
                    )}
                    {!startgamecount && (
                      <div className="absolute left-[250px] ml-80 -bottom-12">
                        <GamePencil />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={remoteWebcamVideoStlye}>
              <video
                ref={remoteWebcamVideoRef}
                autoPlay
                playsInline
                className="relative w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 rounded-lg px-2">
                <span className="text-white text-lg">
                  {guestProfile?.username}
                </span>
              </div>
            </div>

            <div className={controlButtonStyle}>
              <ControlStreamRoom
                micToggleHandler={micToggleHandler}
                videoToggleHandler={videoToggleHandler}
                startScreenShare={startScreenShare}
                isMyScreenShare={isMyScreenShare}
                stopShare={stopShare}
                gameHasStarted={gameHasStarted}
                youtubeIsOn={youtubeIsOn}
              />
            </div>

            <div className={activityButtonStyle}>
              {!(isMyScreenShare || isRemoteScreenShare) &&
                !gameHasStarted &&
                !youtubeIsOn && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={activityButtonSubStyle}
                    onClick={sendIceGameMessage}
                  >
                    <div
                      className={`${
                        shareState === 0
                          ? 'f-ic text-xl gap-4 font-semibold xl:min-w-[200px]'
                          : 'f-ic'
                      }`}
                    >
                      <div className="iconStyle bg-[#E0F5E6] relative">
                        <IceBreaking />
                      </div>
                      {/* {icebreak boolean state && (
                    <span className="hoverActivityButton">
                      아이스 브레이킹 종료하기
                    </span>
                  )} */}
                      <span
                        className={`${
                          shareState > 0 ? 'hidden' : 'xl:inline hidden'
                        }`}
                      >
                        아이스 브레이킹
                      </span>
                    </div>
                  </motion.div>
                )}
              {/* 
              {!(isMyScreenShare || isRemoteScreenShare) && !youtubeIsOn && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={activityButtonSubStyle}
                  // onClick={
                  //   gameHasStarted ? sendstopGameMessage : setGameInfo(true)
                  // }
                  onClick={() => {
                    if (!gameHasStarted) {
                      setGameInfo(true);
                    } else {
                      sendstopGameMessage();
                    }
                  }}
                  onClick={
                    youtubeIsOn ? onYoutubeWatchalongClick : modalOpenHandler
                  }
                >
                  <div
                    className={`${
                      shareState === 0
                        ? 'f-ic text-xl gap-4 font-semibold xl:min-w-[200px]'
                        : 'f-ic'
                    }`}
                  >
                    <div className="iconStyle bg-[#E0F5E6] relative">
                      <Youtube />
                    </div>
                    {youtubeIsOn && (
                      <span className="hoverActivityButton">
                        유튜브 종료하기
                      </span>
                    )}

                    <span
                      className={`${
                        shareState > 0 ? 'hidden' : 'xl:inline hidden'
                      }`}
                    >
                      유튜브 시청
                    </span>
                  </div>
                </motion.div>
              )} */}

              {!(isMyScreenShare || isRemoteScreenShare) && !gameHasStarted && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={activityButtonSubStyle}
                  onClick={
                    youtubeIsOn ? onYoutubeWatchalongClick : modalOpenHandler
                  }
                >
                  <div
                    className={`${
                      shareState === 0
                        ? 'f-ic text-xl gap-4 font-semibold xl:min-w-[200px]'
                        : 'f-ic'
                    }`}
                  >
                    <div className="iconStyle bg-[#E0F5E6] relative">
                      <Youtube />
                    </div>
                    {youtubeIsOn && (
                      <span className="hoverActivityButton">
                        유튜브 종료하기
                      </span>
                    )}

                    <span
                      className={`${
                        shareState > 0 ? 'hidden' : 'xl:inline hidden'
                      }`}
                    >
                      유튜브 시청
                    </span>
                  </div>
                </motion.div>
              )}

              {!(isMyScreenShare || isRemoteScreenShare) &&
                !gameHasStarted &&
                !youtubeIsOn && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={activityButtonSubStyle}
                    onClick={() => {
                      setWaitingForPhotoConfirm(true);
                      sendTakePictureOffer();
                    }}
                  >
                    <div
                      className={`${
                        shareState === 0
                          ? 'f-ic text-xl gap-4 font-semibold xl:min-w-[200px]'
                          : 'f-ic'
                      }`}
                    >
                      <div className="iconStyle bg-[#E0F5E6] relative">
                        <Camera />
                      </div>
                      {/* {사진찍기 boolean state && (
                    <span className="hoverActivityButton">
                      사진찍기 종료하기
                    </span>
                  )} */}
                      <span
                        className={`${
                          shareState > 0 ? 'hidden' : 'xl:inline hidden'
                        }`}
                      >
                        사진찍기
                      </span>
                    </div>
                  </motion.div>
                )}

              {!(isMyScreenShare || isRemoteScreenShare) && !youtubeIsOn && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={activityButtonSubStyle}
                  // onClick={sendstartGameMessage}
                  onClick={() => {
                    if (!gameHasStarted) {
                      sendGameInfoMessage();
                    } else {
                      sendstopGameMessage();
                    }
                  }}
                >
                  <div
                    className={`${
                      shareState === 0
                        ? 'f-ic text-xl gap-4 font-semibold xl:min-w-[200px]'
                        : 'f-ic'
                    }`}
                  >
                    <div className="iconStyle bg-[#E0F5E6] relative">
                      <Game />
                    </div>
                    {gameHasStarted && (
                      <span className="hoverActivityButton">게임 종료하기</span>
                    )}
                    <span
                      className={`${
                        shareState > 0 ? 'hidden' : 'xl:inline hidden'
                      }`}
                    >
                      게임하기
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TakeSnapshot
        setTakePicture={setTakePicture}
        takePicture={takePicture}
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
      />

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
      <Modal
        isOpen={detailModalIsOpen}
        onClose={() => setDetailModalIsOpen(false)}
        hasOverlay
      >
        {guestProfile && (
          <DetailUserInfoModal
            userId={guestProfile?.userId}
            onClose={() => setDetailModalIsOpen(false)}
          />
        )}
      </Modal>
      <Modal
        isOpen={detailModalIsOpen}
        onClose={() => setDetailModalIsOpen(false)}
        hasOverlay
      >
        {guestProfile && (
          <DetailUserInfoModal
            userId={guestProfile?.userId}
            onClose={() => setDetailModalIsOpen(false)}
          />
        )}
      </Modal>
      <Modal
        isOpen={youtubeModalIsOpen}
        onClose={() => setYoutubeModalIsOpen(false)}
        hasOverlay
      >
        <YoutubeModal
          onYoutubeWatchalongClick={onYoutubeWatchalongClick}
          setVideoUrl={setVideoUrl}
        />
      </Modal>
      <Modal
        isOpen={openConfirmModalIsOpen}
        onClose={() => setOpenConfirmModalIsOpen(false)}
        hasOverlay
      >
        <PhotoConfirmModal
          sendPhotoConfirmMessage={sendPhotoConfirmMessage}
          setOpenConfirmModalIsOpen={setOpenConfirmModalIsOpen}
        />
      </Modal>
      <Modal
        isOpen={waitingForPhotoConfirm}
        onClose={() => setWaitingForPhotoConfirm(false)}
        hasOverlay
      >
        <WaitingGuestRef loadingMessage="사진찍기 수락 대기중..." />
      </Modal>

      <Modal
        isOpen={iceBreakerModalIsOpen}
        onClose={() => setIceBreakerModalIsOpen(false)}
      >
        <div className="w-[516px] h-[329px] bg-[#B6ECC4] rounded-2xl flex justify-center items-center">
          <div className="border-2 border-[#FFFFFF] w-[499PX] h-[311px] rounded-2xl flex justify-center items-center">
            <div
              className="bg-[#FFFFFF] text-center relative text-xl w-[446px] h-[259px] rounded-full flex flex-col justify-center items-center"
              style={{
                wordWrap: 'break-word',
                wordBreak: 'keep-all',
                fontFamily: 'GmarketSans_medium',
              }}
            >
              <div className="absolute top-11">
                <IceGameQ />
              </div>
              <div className="mt-2 px-4">{iceQuestion}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
