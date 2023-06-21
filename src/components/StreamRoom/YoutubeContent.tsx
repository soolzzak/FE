import React, { useRef } from 'react';
import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';

declare global {
  interface Window {
    YT: any;
  }
}

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
      console.log('Seeked to:', currentTime);

      const roundedTime = parseFloat(currentTime.toFixed(10)) + 0.4;
      const message = {
        from: userId,
        type: 'startYoutube',
        data: roomNum,
        time: roundedTime,
      };
      console.log('send youtube time', message);
      socket.send(JSON.stringify(message));
    }
    if (event.data === 2 && isHost) {
      const message = {
        from: userId,
        type: 'pauseYoutube',
        data: roomNum,
      };
      console.log('send pause', message);
      socket.send(JSON.stringify(message));
    }
  };

  const guestOpts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
    },
  };
  const hostOpts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  console.log('videolink', videoLink);
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
