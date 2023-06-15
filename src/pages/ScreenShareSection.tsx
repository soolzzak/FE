import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTokenAtom } from '../store/mainpageStore';

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

export const ScreenShareSection = ({
  socket,
  shareView,
}: {
  socket: WebSocket;
  shareView: MediaStream;
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [tokenInfo] = useAtom(userTokenAtom);

  const userId = tokenInfo?.auth.id;
  const params = useParams().id;
  console.log('params', params);
  const roomNum = params;

  const [screenSharePeerConnection, setPeerConnection] =
    useState<RTCPeerConnection>(new RTCPeerConnection(PeerConnectionConfig));

  const [myMediaStream, setMyMediaStream] = useState<MediaStream | null>(null);

  const handleOfferMessage = async (message: RTCSessionMessage) => {
    const answerSDP = new RTCSessionDescription(message.sdp);
    try {
      await screenSharePeerConnection.setRemoteDescription(answerSDP);
      const answer = await screenSharePeerConnection.createAnswer();
      await screenSharePeerConnection.setLocalDescription(answer);
      const response = {
        from: userId,
        data: Number(roomNum),
        type: 'answer',
        sdp: screenSharePeerConnection.localDescription,
      };
      socket.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswerMessage = async (message: RTCSessionMessage) => {
    try {
      await screenSharePeerConnection.setRemoteDescription(message.sdp);
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleCandidateMessage = async (message: RTCIceMessage) => {
    try {
      await screenSharePeerConnection.addIceCandidate(message.candidate);
    } catch (error) {
      console.error('Error handling candidate:', error);
    }
  };

  const startCall = async () => {
    try {
      const offer = await screenSharePeerConnection.createOffer();
      await screenSharePeerConnection.setLocalDescription(offer);
      const message = {
        from: userId,
        type: 'offer',
        data: Number(roomNum),
        sdp: screenSharePeerConnection.localDescription,
      };
      socket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const createPeerConnection = async () => {
    screenSharePeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const message = {
          from: userId,
          data: Number(roomNum),
          type: 'ice',
          candidate: event.candidate,
        };
        socket.send(JSON.stringify(message));
      }
    };
    screenSharePeerConnection.ontrack = (event) => {
      const stream = event.streams[0];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };
    screenSharePeerConnection.oniceconnectionstatechange = () => {
      if (
        screenSharePeerConnection.iceConnectionState === 'disconnected' ||
        screenSharePeerConnection.iceConnectionState === 'closed'
      ) {
        console.log('Opposing peer disconnected');
        if (remoteVideoRef.current) {
          if (remoteVideoRef.current.srcObject) {
            const stream = remoteVideoRef.current.srcObject as MediaStream;
          }
          remoteVideoRef.current.srcObject = null;
        }
        console.log('peerConnection', screenSharePeerConnection);
      }
    };
    shareView?.getTracks().forEach((track) => {
      screenSharePeerConnection.addTrack(track, shareView);
    });
  };

  useEffect(() => {
    createPeerConnection();
    startCall();
    return () => {
      if (screenSharePeerConnection) {
        screenSharePeerConnection.close();
      }
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-w-[660px]">
      <video
        ref={localVideoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-3xl"
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        muted
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
};
