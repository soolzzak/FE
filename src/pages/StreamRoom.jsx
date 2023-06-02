import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { Report } from '../assets/svgs/Report';
// import { ReactComponent as Water } from '../assets/svgs/Water';
import { getRoom } from '../api/streamRoom';
import { Thumbdown } from '../assets/svgs/Thumbdown';
import { Thumbup } from '../assets/svgs/Thumbup';

const PeerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
  ],
};

let mediaStream;
export const StreamRoom = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const getCookie = Cookies.get('accessKey');
  const params = useParams().id;

  const userId = jwtDecode(getCookie).auth.id;
  console.log('userId', userId);
  const roomNum = params;

  let socket;
  let peerConnection;

  const handleOfferMessage = async (message) => {
    console.log('accepting offer', message);
    const answerSDP = new RTCSessionDescription(message.sdp);
    try {
      console.log('setRemotelDescription', message.sdp);
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
  const handleAnswerMessage = async (message) => {
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

  const handleCandidateMessage = async (message) => {
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
    const configuration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
    peerConnection = new RTCPeerConnection(PeerConnectionConfig);

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
      setRemoteStream(stream);
      remoteVideoRef.current.srcObject = stream;
    };

    console.log('adding media stream', mediaStream);
    mediaStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, mediaStream);
    });
    console.log('created peer connection: ', peerConnection);
  };

  useEffect(() => {
    const signalingServerUrl = 'wss://localhost:8443/signal';
    socket = new WebSocket(signalingServerUrl);

    const startLocalStream = async () => {
      try {
        // eslint-disable-next-line no-undef
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = mediaStream;
        console.log('adding media stream', mediaStream);
        setLocalStream((prev) => mediaStream);
        mediaStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, mediaStream);
        });
        console.log('media stream', mediaStream);
      } catch (error) {
        console.log('Error accessing media devices:', error);
      }
    };
    startLocalStream();
    // Establish a connection with the signaling server
    const connectToSignalingServer = () => {
      socket.onopen = () => {
        const message = JSON.stringify({
          from: userId,
          type: 'join',
          data: roomNum,
        });
        console.log('WebSocket connection opened');
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
            message.data = await getRoom(params);
            console.log(message.data.data.hostId);
            await createPeerConnection();
            if (message.data.data.hostId !== userId) {
              console.log('starting call');
              await startCall();
            }

            break;
          default:
            console.warn('Invalid message type:', message.type);
        }
      };
    };

    connectToSignalingServer();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
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

          <div className="flex flex-row gap-4 ">
            <Thumbdown />
            <Thumbup />
            <Report />
          </div>
        </div>
        <p className="font-semibold text-[32px]">얘기하면서 같이 소주마셔요!</p>
      </div>
      <div className="grid grid-cols-2">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={localVideoRef} autoPlay className=" rounded-xl" />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={remoteVideoRef} autoPlay className="rounded-xl" />
      </div>
    </div>
  );
};
