import React, { useEffect, useRef } from "react";
import io from "socket.io-client";


// WebRTC STUN servers
// WebRTC STUN 서버 정보
const  pc_config = {
    iceServers: [
      { urls: "stun:stun.stunprotocol.org:3478" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };

//   const SOCKET_SERVER_URL = "http://localhost:8080";

const Webrtc = () => {
    const socketRef = useRef<SocketIOClient.Socket>();
    const pcRef = useRef<RTCPeerConnection>();
    // 내비디오오디오재생
    const localVideoRef = useRef<HTMLVideoElement>(null);
    // 상대방비디오오디오재생
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
    const setVideoTracks = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          if(localVideoRef.current) localVideoRef.current.srcObject = stream;
          if (!(pcRef.current && socketRef.current)) return;
          stream.getTracks().forEach((track) => {
            if (!pcRef.current) return;
            pcRef.current.addTrack(track, stream);
          });
          pcRef.current.onicecandidate = (e) => {
            if (e.candidate) {
              if (!socketRef.current) return;
              console.log("onicecandidate");
              socketRef.current.emit("candidate", e.candidate);
            }
          };
          pcRef.current.oniceconnectionstatechange = (e) => {
            console.log(e);
          };
          pcRef.current.ontrack = (ev) => {
            console.log("add remotetrack success");
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = ev.streams[0];
            }
          };
        };



}
export default Webrtc;