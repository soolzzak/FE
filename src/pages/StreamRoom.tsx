import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Report } from '../assets/svgs/Report';
import { getRoom } from '../api/streamRoom';

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
        remoteVideoRef.current.srcObject = stream;
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
            if (message.data) {
              message.data = await getRoom(params || '');
            }
            await startLocalStream();
            await createPeerConnection();
            // console.log(message.data.data.hostId);
            if (message.data?.data.hostId !== userId) {
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

  return (
    <div className="flex flex-col h-screen p-5 m-5 rounded-3xl bg-[#cdcdcd]">
      <div className="basis-1/12  flex justify-between p-4">
        <div className="flex flex-row items-center">
          <div className="w-16 h-16 rounded-full bg-[#9A9A9A] mr-4" />
          <p className="text-[20px] font-semibold mr-4">
            카리나님과 따로 또 같이 혼술하는 중!
          </p>

          <div className="flex flex-row gap-4 ">{/* <Report /> */}</div>
        </div>
        <p className="font-semibold text-[32px]">얘기하면서 같이 소주마셔요!</p>
      </div>
      <div className="grid grid-cols-2">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={localVideoRef} autoPlay muted className=" rounded-xl" />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={remoteVideoRef} autoPlay muted className="rounded-xl" />
      </div>
    </div>
  );
};
