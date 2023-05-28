const socket = new WebSocket('wss://' + window.location.host + '/signal');

// WebRTC STUN servers
// WebRTC STUN 서버 정보
const peerConnectionConfig = {
  iceServers: [
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

// function createPeerConnection() {
//     myPeerConnection = new RTCPeerConnection(peerConnectionConfig);

//! 얘 어디선가 가져온것 https://kbs77.tistory.com/102
// import { useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Socket } from "socket.io-client";

// const VideoCall = () => {
//   // 소켓정보를 담을 Ref
//   const socketRef = useRef<Socket>();
//   // 자신의 비디오
//   const myVideoRef = useRef<HTMLVideoElement>(null);
//   // 다른사람의 비디오
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   // peerConnection
//   const pcRef = useRef<RTCPeerConnection>();

//   // 저는 특정 화면에서 방으로 진입시에 해당 방의 방번호를 url parameter로 전달해주었습니다.
//   const {roomName} = useParams();

//   useEffect(() => {
//     // 소켓 연결
//     socketRef.current = io("localhost:3000");

//     // peerConnection 생성
//     // iceServers는 stun sever설정이며 google의 public stun server를 사용하였습니다.
//     peerRef.current = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: "stun:stun.l.google.com:19302",
//         },
//       ],
//     });
//   }, [])

//   return (
//     <div>
//       <video ref={myVideoRef} autoPlay />
//       <video ref={remoteVideoRef} autoPlay />
//     </div>
//   );
// };

// export default VideoCall;
