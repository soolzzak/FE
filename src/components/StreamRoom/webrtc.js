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
