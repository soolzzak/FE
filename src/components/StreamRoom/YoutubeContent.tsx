import React from 'react';
import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';

export const YoutubeContent = ({
  videoLink,
  socket,
  userId,
  playerRef,
  roomNum,
  isHost,
}: {
  videoLink: string;
  socket: WebSocket;
  userId: number;
  roomNum: number;
  isHost: boolean;
  playerRef: React.RefObject<YouTube>;
}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
  };
  const onVideoStatechange = (event: YouTubeEvent) => {
    if (event.data === 1 && isHost) {
      const currentTime = event.target.getCurrentTime();
      const roundedTime = parseFloat(currentTime.toFixed(10)) + 0.4;
      const message = {
        from: userId,
        type: 'startYoutube',
        data: roomNum,
        time: roundedTime,
      };
      socket.send(JSON.stringify(message));
    }
    if (event.data === 2 && isHost) {
      const message = {
        from: userId,
        type: 'pauseYoutube',
        data: roomNum,
      };
      socket.send(JSON.stringify(message));
    }
  };

  const hostOpts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      className="h-full"
      videoId={videoLink}
      opts={hostOpts}
      onStateChange={onVideoStatechange}
      onReady={onPlayerReady}
      ref={playerRef}
    />
  );
};
