// import React, { useEffect, useRef, useState } from 'react';

// const PeerConnectionConfig = {
//   iceServers: [
//     { urls: 'stun:stun.stunprotocol.org:3478' },
//     { urls: 'stun:stun.l.google.com:19302' },
//   ],
// };

// const MediaConstraints = {
//   video: true,
//   audio: {
//     echoCancellation: true,
//     noiseSuppression: true,
//     sampleRate: 44100,
//   },
// };

// const StreamRoom = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [myPeerConnection, setMyPeerConnection] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const localUserNameRef = useRef('');
//   const localRoomRef = useRef('');

//   useEffect(() => {
//     start();
//     return () => stop();
//   }, []);

//   const start = () => {
//     const socket = new WebSocket('wss://localhost:8443/signal');

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);

//       switch (message.type) {
//         case 'offer':
//           console.log('Signal OFFER received');
//           handleOfferMessage(message);
//           break;
//         case 'answer':
//           console.log('Signal ANSWER received');
//           handleAnswerMessage(message);
//           break;
//         case 'ice':
//           console.log('Signal ICE Candidate received');
//           handleNewICECandidateMessage(message);
//           break;
//         case 'join':
//           const data = chatListCount();
//           console.log(
//             'Client is starting to ' +
//               (data === 'true)' ? 'negotiate' : 'wait for a peer')
//           );
//           console.log('messageDATA : ' + data);
//           handlePeerConnection(message);
//           break;
//         case 'leave':
//           stop();
//           break;
//         default:
//           handleErrorMessage('Wrong type message received from server');
//       }
//     };

//     socket.onopen = () => {
//       console.log(
//         'WebSocket connection opened to Room: #' + localRoomRef.current
//       );
//       sendToServer({
//         from: localUserNameRef.current,
//         type: 'join',
//         data: localRoomRef.current,
//       });
//     };

//     socket.onclose = () => {
//       console.log('Socket has been closed');
//     };

//     socket.onerror = (error) => {
//       handleErrorMessage('Error: ' + error);
//     };

//     const chatListCount = () => {
//       let data;

//       $.ajax({
//         url: '/webrtc/usercount',
//         type: 'POST',
//         async: false,
//         data: {
//           from: localUserNameRef.current,
//           type: 'findCount',
//           data: localRoomRef.current,
//           candidate: null,
//           sdp: null,
//         },
//         success(result) {
//           data = result;
//         },
//         error(result) {
//           console.log('error : ' + result);
//         },
//       });

//       return data;
//     };

//     const stop = () => {
//       log("Send 'leave' message to server");
//       sendToServer({
//         from: localUserNameRef.current,
//         type: 'leave',
//         data: localRoomRef.current,
//       });

//       if (myPeerConnection) {
//         console.log('Close the RTCPeerConnection');

//         myPeerConnection.onicecandidate = null;
//         myPeerConnection.ontrack = null;
//         myPeerConnection.onnegotiationneeded = null;
//         myPeerConnection.oniceconnectionstatechange = null;
//         myPeerConnection.onsignalingstatechange = null;

//         myPeerConnection.getTransceivers().forEach((transceiver) => {
//           transceiver.stop();
//         });

//         myPeerConnection.close();
//       }
//     };

//     const handleErrorMessage = (error) => {
//       console.error(error);
//       // Add your error handling logic here
//     };

//     const sendToServer = (message) => {
//       const jsonMessage = JSON.stringify(message);
//       socket.send(jsonMessage);
//     };

//     const handlePeerConnection = (message) => {
//       if (message.data === 'true') {
//         createPeerConnection();
//       }
//     };

//     const createPeerConnection = () => {
//       console.log('Creating RTCPeerConnection');
//       const peerConnection = new RTCPeerConnection(PeerConnectionConfig);

//       setMyPeerConnection(peerConnection);

//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });

//       peerConnection.onicecandidate = handleICECandidateEvent;
//       peerConnection.ontrack = handleTrackEvent;
//       peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
//       peerConnection.oniceconnectionstatechange =
//         handleICEConnectionStateChangeEvent;
//       peerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
//     };

//     const handleICECandidateEvent = (event) => {
//       if (event.candidate) {
//         sendToServer({
//           from: localUserNameRef.current,
//           type: 'ice',
//           data: event.candidate,
//         });
//       }
//     };

//     const handleTrackEvent = (event) => {
//       console.log('Track event received');
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     const handleNegotiationNeededEvent = async () => {
//       console.log('Negotiation needed');
//       try {
//         const offer = await myPeerConnection.createOffer();
//         await myPeerConnection.setLocalDescription(offer);
//         sendToServer({
//           from: localUserNameRef.current,
//           type: 'offer',
//           data: offer,
//         });
//       } catch (error) {
//         handleErrorMessage('Error creating offer: ' + error);
//       }
//     };

//     const handleSignalingStateChangeEvent = () => {
//       if (myPeerConnection) {
//         console.log('Signaling state change:', myPeerConnection.signalingState);
//         // Add your handling logic here
//       }
//     };

//     const handleOfferMessage = async (message) => {
//       if (!myPeerConnection) {
//         createPeerConnection();
//       }

//       try {
//         await myPeerConnection.setRemoteDescription(message.data);
//         const answer = await myPeerConnection.createAnswer();
//         await myPeerConnection.setLocalDescription(answer);
//         sendToServer({
//           from: localUserNameRef.current,
//           type: 'answer',
//           data: answer,
//         });
//       } catch (error) {
//         handleErrorMessage('Error handling offer: ' + error);
//       }
//     };

//     const handleAnswerMessage = async (message) => {
//       if (!myPeerConnection) {
//         createPeerConnection();
//       }

//       try {
//         await myPeerConnection.setRemoteDescription(message.data);
//       } catch (error) {
//         handleErrorMessage('Error handling answer: ' + error);
//       }
//     };

//     const handleNewICECandidateMessage = async (message) => {
//       try {
//         await myPeerConnection.addIceCandidate(message.data);
//       } catch (error) {
//         handleErrorMessage('Error handling ICE candidate: ' + error);
//       }
//     };

//     const handleICEConnectionStateChangeEvent = () => {
//       if (myPeerConnection) {
//         console.log(
//           'ICE connection state change:',
//           myPeerConnection.iceConnectionState
//         );
//         // Add your handling logic here
//       }
//     };
//   };
//   const handleStart = () => {
//     navigator.mediaDevices
//       .getUserMedia(MediaConstraints)
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         setLocalStream(stream);
//       })
//       .catch((error) => {
//         handleErrorMessage('Error accessing media devices: ' + error);
//       });
//   };

//   const handleStop = () => {
//     stop();
//     localVideoRef.current.srcObject = null;
//     setLocalStream(null);
//   };

//   const handleUserNameChange = (event) => {
//     localUserNameRef.current = event.target.value;
//   };

//   const handleRoomChange = (event) => {
//     localRoomRef.current = event.target.value;
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={handleUserNameChange}
//         />
//         <input type="text" placeholder="Room" onChange={handleRoomChange} />
//         <button onClick={handleStart}>Start</button>
//         <button onClick={handleStop}>Stop</button>
//       </div>
//       <div>
//         <video ref={localVideoRef} autoPlay muted />
//         <video ref={remoteVideoRef} autoPlay />
//       </div>
//     </div>
//   );
// };
